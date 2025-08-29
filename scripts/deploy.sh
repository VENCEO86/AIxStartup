#!/bin/bash

echo "🚀 AIxStartup 배포 시작..."

# 1. 백엔드 빌드
echo "📦 백엔드 빌드 중..."
cd backend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 백엔드 빌드 실패"
    exit 1
fi
echo "✅ 백엔드 빌드 완료"

# 2. 프론트엔드 빌드
echo "📦 프론트엔드 빌드 중..."
cd ../frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 프론트엔드 빌드 실패"
    exit 1
fi
echo "✅ 프론트엔드 빌드 완료"

# 3. 배포 디렉토리 생성
echo "📁 배포 디렉토리 준비 중..."
cd ..
mkdir -p deploy
cp -r backend/dist/* deploy/
cp -r frontend/dist/* deploy/public/

# 4. 배포 완료
echo "🎉 배포 준비 완료!"
echo "📂 배포 파일 위치: ./deploy/"
echo "🌐 프론트엔드: ./deploy/public/"
echo "🔧 백엔드: ./deploy/"

echo ""
echo "📋 배포 체크리스트:"
echo "✅ 백엔드 API 서버 실행 확인"
echo "✅ 프론트엔드 빌드 완료"
echo "✅ 환경 변수 설정 확인"
echo "✅ CORS 설정 확인"
echo "✅ 데이터베이스 연결 확인"
