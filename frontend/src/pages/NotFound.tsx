import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다 - AIxStartup</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-bold text-primary-600">404</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="btn btn-primary w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전 페이지로
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;


