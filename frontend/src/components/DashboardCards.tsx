import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
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

const DashboardCards: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response: ApiResponse = await apiClient.get('/api/dashboard');
        setDashboardData(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || '데이터를 불러오는데 실패했습니다.');
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
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
        데이터를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 매출</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(dashboardData.totals.sales)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+12.5%</span> 지난 달 대비
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 지출</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(dashboardData.totals.purchases)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-red-600">+8.2%</span> 지난 달 대비
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">순이익</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(dashboardData.totals.profit)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+15.3%</span> 지난 달 대비
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">거래처 수</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardData.topClients.length}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+2</span> 이번 달 신규
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
