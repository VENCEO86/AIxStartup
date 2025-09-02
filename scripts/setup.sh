#!/bin/bash

echo "🚀 AIxStartup 프로젝트 설정을 시작합니다..."

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 함수 정의
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Node.js 버전 확인
echo "📋 Node.js 버전 확인 중..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js 버전: $NODE_VERSION"
else
    print_error "Node.js가 설치되어 있지 않습니다. https://nodejs.org/에서 설치해주세요."
    exit 1
fi

# npm 버전 확인
echo "📋 npm 버전 확인 중..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_status "npm 버전: $NPM_VERSION"
else
    print_error "npm이 설치되어 있지 않습니다."
    exit 1
fi

# 루트 의존성 설치
echo "📦 루트 의존성 설치 중..."
npm install
if [ $? -eq 0 ]; then
    print_status "루트 의존성 설치 완료"
else
    print_error "루트 의존성 설치 실패"
    exit 1
fi

# 백엔드 의존성 설치
echo "📦 백엔드 의존성 설치 중..."
cd backend
npm install
if [ $? -eq 0 ]; then
    print_status "백엔드 의존성 설치 완료"
else
    print_error "백엔드 의존성 설치 실패"
    exit 1
fi
cd ..

# 프론트엔드 의존성 설치
echo "📦 프론트엔드 의존성 설치 중..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    print_status "프론트엔드 의존성 설치 완료"
else
    print_error "프론트엔드 의존성 설치 실패"
    exit 1
fi
cd ..

# 환경 변수 파일 생성
echo "🔧 환경 변수 파일 생성 중..."
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    print_status "백엔드 환경 변수 파일 생성됨"
    print_warning "backend/.env 파일을 편집하여 실제 값으로 설정해주세요."
else
    print_status "백엔드 환경 변수 파일이 이미 존재합니다."
fi

# 데이터베이스 설정
echo "🗄️  데이터베이스 설정 중..."
cd backend
npm run setup:db
if [ $? -eq 0 ]; then
    print_status "데이터베이스 설정 완료"
else
    print_warning "데이터베이스 설정 실패 - PostgreSQL이 설치되어 있는지 확인해주세요."
fi
cd ..

echo ""
echo "🎉 AIxStartup 프로젝트 설정이 완료되었습니다!"
echo ""
echo "📋 다음 단계:"
echo "1. backend/.env 파일을 편집하여 데이터베이스 연결 정보를 설정하세요"
echo "2. PostgreSQL과 Redis가 실행 중인지 확인하세요"
echo "3. 'npm run dev' 명령어로 개발 서버를 시작하세요"
echo ""
echo "🌐 개발 서버:"
echo "   - 프론트엔드: http://localhost:3000"
echo "   - 백엔드 API: http://localhost:5000"
echo "   - 헬스체크: http://localhost:5000/health"
echo ""
echo "📚 문서:"
echo "   - README.md 파일을 참조하세요"
echo ""


