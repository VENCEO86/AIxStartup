import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users
} from 'lucide-react';
import DashboardCards from '../components/DashboardCards';
import DashboardCharts from '../components/DashboardCharts';
import { Card, CardContent } from '../components/ui/card';
import ApiTest from '../components/ApiTest';

const Dashboard: React.FC = () => {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-2">매출 및 지출 현황을 한눈에 확인하세요</p>
      </div>

      {/* Dashboard Cards */}
      <DashboardCards />

             {/* Charts Section */}
       <DashboardCharts />

             {/* Summary Section */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card>
           <CardContent className="p-6">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-gray-600">이번 달 목표 달성률</p>
                 <p className="text-2xl font-bold text-gray-900">85%</p>
               </div>
               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                 <TrendingUp className="w-8 h-8 text-blue-600" />
               </div>
             </div>
           </CardContent>
         </Card>

         <Card>
           <CardContent className="p-6">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-gray-600">평균 거래 금액</p>
                 <p className="text-2xl font-bold text-gray-900">₩125,000</p>
               </div>
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                 <DollarSign className="w-8 h-8 text-green-600" />
               </div>
             </div>
           </CardContent>
         </Card>

         <Card>
           <CardContent className="p-6">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-gray-600">활성 파트너</p>
                 <p className="text-2xl font-bold text-gray-900">18</p>
               </div>
               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                 <Users className="w-8 h-8 text-purple-600" />
               </div>
             </div>
           </CardContent>
         </Card>
       </div>

       {/* API Test Section */}
       <div className="mt-8">
         <ApiTest />
       </div>
     </div>
   );
 };

export default Dashboard;
