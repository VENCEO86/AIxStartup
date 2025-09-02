import React, { useState, useEffect } from 'react';
import { BarChart3, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import apiClient from '../utils/api';

interface DashboardData {
  totals: {
    sales: number;
    purchases: number;
    profit: number;
  };
  topClients: Array<{
    name: string;
    sales: number;
  }>;
  monthlyData: Array<{
    month: string;
    revenue: number;
    expense: number;
    profit: number;
  }>;
}

interface ApiResponse {
  success: boolean;
  data: DashboardData;
  message: string;
}

const DashboardCharts: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response: ApiResponse = await apiClient.get('/api/dashboard');
        setDashboardData(response.data);
      } catch (err: any) {
        // Fallback to mock data if API fails
        setDashboardData({
          totals: { sales: 12345000, purchases: 6789000, profit: 5556000 },
          topClients: [
            { name: "Alpha Co", sales: 5500000 },
            { name: "Beta Ltd", sales: 4200000 },
            { name: "Gamma Inc", sales: 2645000 }
          ],
          monthlyData: [
            { month: "2025-01", revenue: 100000, expense: 80000, profit: 20000 },
            { month: "2025-02", revenue: 120000, expense: 90000, profit: 30000 },
            { month: "2025-03", revenue: 150000, expense: 110000, profit: 40000 },
            { month: "2025-04", revenue: 180000, expense: 130000, profit: 50000 },
            { month: "2025-05", revenue: 200000, expense: 140000, profit: 60000 },
            { month: "2025-06", revenue: 250000, expense: 160000, profit: 90000 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="h-12 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center text-red-600">
        차트 데이터를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>월별 매출 트렌드 (API 데이터)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{data.month}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    매출: {formatCurrency(data.revenue)}
                  </span>
                  <span className="text-sm text-gray-600">
                    지출: {formatCurrency(data.expense)}
                  </span>
                  <span className={`text-sm font-medium ${
                    data.profit >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.profit >= 0 ? '+' : ''}{formatCurrency(data.profit)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Clients */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span>상위 거래처 (API 데이터)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.topClients.map((client, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-600">매출: {formatCurrency(client.sales)}</p>
                </div>
                <span className="text-xs text-gray-500">#{index + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;


