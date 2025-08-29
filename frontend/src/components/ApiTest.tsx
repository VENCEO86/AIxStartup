import React, { useState, useEffect } from 'react';
import apiClient from '../utils/api';

interface ApiTestResult {
  health: any;
  dashboard: any;
  loading: boolean;
  error: string | null;
  lastTestTime: string | null;
  responseTime: number | null;
}

const ApiTest: React.FC = () => {
  const [results, setResults] = useState<ApiTestResult>({
    health: null,
    dashboard: null,
    loading: false,
    error: null,
    lastTestTime: null,
    responseTime: null
  });

  const testApiConnection = async () => {
    setResults(prev => ({ ...prev, loading: true, error: null }));
    const startTime = Date.now();
    
    try {
      // Health check
      const healthResponse = await apiClient.get('/health');
      
      // Dashboard data
      const dashboardResponse = await apiClient.get('/api/dashboard');
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      setResults({
        health: healthResponse,
        dashboard: dashboardResponse,
        loading: false,
        error: null,
        lastTestTime: new Date().toLocaleString('ko-KR'),
        responseTime
      });
    } catch (error: any) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      setResults(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'API 연결 실패',
        lastTestTime: new Date().toLocaleString('ko-KR'),
        responseTime
      }));
    }
  };

  useEffect(() => {
    testApiConnection();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">🔗 실시간 API 연동 테스트</h2>
      
      {/* Status Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${results.error ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className="font-medium">
              {results.error ? '연결 실패' : '연결 성공'}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {results.lastTestTime && (
              <>
                마지막 테스트: {results.lastTestTime}
                {results.responseTime && (
                  <span className="ml-2">({results.responseTime}ms)</span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {results.loading && (
        <div className="text-blue-600 mb-4 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          API 연결 테스트 중...
        </div>
      )}
      
      {results.error && (
        <div className="text-red-600 mb-4 p-3 bg-red-50 rounded-lg">
          <strong>오류:</strong> {results.error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Health Check
          </h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-32">
            {results.health ? JSON.stringify(results.health, null, 2) : '로딩 중...'}
          </pre>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Dashboard API
          </h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-32">
            {results.dashboard ? JSON.stringify(results.dashboard, null, 2) : '로딩 중...'}
          </pre>
        </div>
      </div>
      
      <div className="mt-6 flex space-x-3">
        <button
          onClick={testApiConnection}
          disabled={results.loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center"
        >
          {results.loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              테스트 중...
            </>
          ) : (
            '🔄 다시 테스트'
          )}
        </button>
        
        <button
          onClick={() => window.open('http://localhost:4000/health', '_blank')}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          🔗 백엔드 직접 확인
        </button>
      </div>
    </div>
  );
};

export default ApiTest;
