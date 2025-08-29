import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: '실시간 매출 분석',
      description: '매출과 지출을 실시간으로 추적하고 분석하여 비즈니스 인사이트를 제공합니다.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: '안전한 데이터 관리',
      description: '엔터프라이즈급 보안으로 귀사의 중요한 비즈니스 데이터를 안전하게 보호합니다.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: '빠른 설정',
      description: '몇 분 만에 설정하고 바로 사용할 수 있는 직관적인 인터페이스를 제공합니다.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: '상세한 리포트',
      description: '월별, 분기별, 연도별 상세한 리포트와 차트로 비즈니스 성과를 한눈에 확인하세요.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '팀 협업',
      description: '팀원들과 함께 데이터를 공유하고 협업할 수 있는 기능을 제공합니다.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: '모바일 지원',
      description: '언제 어디서나 모바일로 접근하여 비즈니스 현황을 확인할 수 있습니다.'
    }
  ];

  const benefits = [
    '매출/지출 현황을 한눈에 파악',
    '실시간 데이터 업데이트',
    '직관적인 대시보드',
    '상세한 분석 리포트',
    '안전한 데이터 보호',
    '24/7 고객 지원'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              스타트업을 위한
              <br />
              <span className="text-yellow-300">스마트 매출계산기</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              매출과 지출을 직관적으로 관리하고, 비즈니스 성과를 실시간으로 추적하세요.
              AIxStartup과 함께 성장하는 스타트업이 되세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-200"
              >
                무료로 시작하기
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200"
              >
                데모 보기
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              강력한 기능으로 비즈니스를 성장시키세요
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AIxStartup은 스타트업과 소규모 기업을 위한 최적화된 매출 관리 솔루션을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                왜 AIxStartup을 선택해야 할까요?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                수많은 스타트업들이 AIxStartup을 통해 비즈니스 성과를 향상시키고 있습니다.
                간단하고 직관적인 인터페이스로 복잡한 재무 관리를 쉽게 만드세요.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">지금 시작하세요</h3>
              <p className="text-blue-100 mb-6">
                14일 무료 체험으로 AIxStartup의 모든 기능을 경험해보세요.
                신용카드 정보 없이도 바로 시작할 수 있습니다.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                무료 체험 시작
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            비즈니스 성장을 위한 첫 걸음을 시작하세요
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            AIxStartup과 함께 매출 관리를 스마트하게 만들어보세요.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            지금 시작하기
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
