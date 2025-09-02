import { Helmet } from 'react-helmet-async';
import { User, Mail, Calendar, Settings } from 'lucide-react';

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>프로필 - AIxStartup</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">프로필</h1>
          <p className="text-gray-600">계정 정보를 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-body text-center">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">홍길동</h3>
                <p className="text-gray-600 mb-4">hong@example.com</p>
                <button className="btn btn-outline w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  프로필 편집
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">계정 정보</h3>
              </div>
              <div className="card-body">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름
                    </label>
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">홍길동</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일
                    </label>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">hong@example.com</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      가입일
                    </label>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">2024년 1월 15일</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      계정 유형
                    </label>
                    <span className="badge badge-primary">일반 사용자</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="card mt-6">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">보안 설정</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">비밀번호 변경</h4>
                      <p className="text-sm text-gray-600">계정 보안을 위해 정기적으로 비밀번호를 변경하세요</p>
                    </div>
                    <button className="btn btn-outline">변경</button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">2단계 인증</h4>
                      <p className="text-sm text-gray-600">추가 보안을 위해 2단계 인증을 활성화하세요</p>
                    </div>
                    <button className="btn btn-outline">설정</button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">로그인 세션</h4>
                      <p className="text-sm text-gray-600">현재 활성화된 로그인 세션을 관리하세요</p>
                    </div>
                    <button className="btn btn-outline">관리</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;


