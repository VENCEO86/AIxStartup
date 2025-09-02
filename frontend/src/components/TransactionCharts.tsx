import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, BarChart3, LineChart, Calendar } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

interface Transaction {
  id: string;
  partnerType: 'new' | 'existing';
  partnerCompany: string;
  type: 'revenue' | 'expense';
  category: string;
  customCategory?: string;
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod?: string;
  notes?: string;
}

interface TransactionChartsProps {
  transactions: Transaction[];
}

const TransactionCharts: React.FC<TransactionChartsProps> = ({ transactions }) => {
  // 데이터에서 연도 범위 계산
  const yearRange = useMemo(() => {
    if (transactions.length === 0) {
      const currentYear = new Date().getFullYear();
      return { min: currentYear, max: currentYear };
    }
    
    const years = transactions.map(t => new Date(t.date).getFullYear());
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    
    return { min: minYear, max: maxYear };
  }, [transactions]);

  const [selectedYear, setSelectedYear] = useState<number>(yearRange.max);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [chartType, setChartType] = useState<'line' | 'bar'>('bar');

  // 선택된 연도와 월에 따른 데이터 생성
  const chartData = useMemo(() => {
    const yearStart = new Date(selectedYear, 0, 1);
    const yearEnd = new Date(selectedYear, 11, 31);
    
    // 연도별 월 데이터 생성
    const months = Array.from({ length: 12 }, (_, i) => i);
    const labels = months.map(month => `${month + 1}월`);
    
    const revenueData = months.map(month => {
      const monthStart = new Date(selectedYear, month, 1);
      const monthEnd = new Date(selectedYear, month + 1, 0);
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate >= monthStart && tDate <= monthEnd;
      });
      return monthTransactions.filter(t => t.type === 'revenue').reduce((sum, t) => sum + t.amount, 0);
    });
    
    const expenseData = months.map(month => {
      const monthStart = new Date(selectedYear, month, 1);
      const monthEnd = new Date(selectedYear, month + 1, 0);
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate >= monthStart && tDate <= monthEnd;
      });
      return monthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    });
    
    return { labels, revenueData, expenseData };
  }, [transactions, selectedYear]);

  // 도넛 차트 데이터 (왼쪽)
  const doughnutData = {
    labels: ['매출', '매입'],
    datasets: [
      {
        data: [
          chartData.revenueData.reduce((sum, amount) => sum + amount, 0),
          chartData.expenseData.reduce((sum, amount) => sum + amount, 0),
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 3,
        hoverOffset: 4,
      },
    ],
  };

  // 막대 차트 데이터 (오른쪽)
  const barChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: '매출',
        data: chartData.revenueData,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: '매입',
        data: chartData.expenseData,
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // 차트 옵션
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            // 백만원 단위로 표시
            return `${label}: ${(value / 1000000).toFixed(1)}백만원`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: any) {
            // 백만원 단위로 표시
            return `${(value / 1000000).toFixed(1)}백만원`;
          },
          font: {
            size: 11,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  // 통계 요약
  const totalRevenue = chartData.revenueData.reduce((sum, amount) => sum + amount, 0);
  const totalExpense = chartData.expenseData.reduce((sum, amount) => sum + amount, 0);

  // 연도 옵션 생성 (데이터 기준으로 동적 생성)
  const yearOptions = Array.from(
    { length: yearRange.max - yearRange.min + 1 }, 
    (_, i) => yearRange.max - i
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* 헤더 */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">📊 거래 통계 분석</h3>
          <p className="text-gray-600">연도별 매출/매입 트렌드와 비율 분석</p>
        </div>
        
        {/* 차트 타입 선택 */}
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <button
            onClick={() => setChartType('line')}
            className={`p-2 rounded-lg transition-all ${
              chartType === 'line' 
                ? 'bg-blue-100 text-blue-600 border-2 border-blue-300' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="선형 차트"
          >
            <LineChart className="w-5 h-5" />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded-lg transition-all ${
              chartType === 'bar' 
                ? 'bg-blue-100 text-blue-600 border-2 border-blue-300' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="막대 차트"
          >
            <BarChart3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 연도 및 월 선택 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 연도 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">연도 선택</label>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
            >
              {yearOptions.map(year => (
                <option key={year} value={year}>{year}년</option>
              ))}
            </select>
          </div>
        </div>

        {/* 월별 드래그바 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">월별 선택</label>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">1월</span>
            <input
              type="range"
              min="0"
              max="11"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-gray-600">12월</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg font-medium">
              {selectedMonth + 1}월
            </span>
          </div>
        </div>
      </div>

      {/* 통계 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-500 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-700">총 매출</p>
              <p className="text-lg font-bold text-green-900">{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-500 rounded-lg">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-700">총 매입</p>
              <p className="text-lg font-bold text-red-900">{totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 차트 영역 - 왼쪽 도표, 오른쪽 그래프 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 왼쪽: 도넛 차트 (도표) */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            {selectedYear}년 매출/매입 비율
          </h4>
          <div className="h-80 flex items-center justify-center">
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>

        {/* 오른쪽: 막대 차트 (그래프) */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">
              {selectedYear}년 월별 매출/매입 트렌드
            </h4>
            <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
              단위: 백만원
            </span>
          </div>
          <div className="h-80">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* 커스텀 슬라이더 스타일 */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default TransactionCharts;
