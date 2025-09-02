# 🚀 AIxStartup 배포 가이드

## 📋 배포 전 체크리스트

### ✅ 백엔드 체크리스트
- [ ] Express API 서버 정상 실행
- [ ] TypeScript 컴파일 오류 없음
- [ ] CORS 설정 완료 (프론트엔드 도메인 허용)
- [ ] 환경 변수 설정 완료
- [ ] API 엔드포인트 테스트 통과
- [ ] 데이터베이스 연결 확인 (PostgreSQL)
- [ ] Redis 연결 확인 (캐싱)
- [ ] 로깅 시스템 설정 완료

### ✅ 프론트엔드 체크리스트
- [ ] React 앱 빌드 성공
- [ ] TypeScript 컴파일 오류 없음
- [ ] API 클라이언트 설정 완료
- [ ] 환경 변수 설정 완료
- [ ] 라우팅 설정 완료
- [ ] UI/UX 컴포넌트 정상 작동
- [ ] 반응형 디자인 확인
- [ ] 브라우저 호환성 확인

### ✅ 연동 체크리스트
- [ ] 프론트엔드 → 백엔드 API 호출 성공
- [ ] CORS 오류 없음
- [ ] 인증 시스템 작동 확인
- [ ] 에러 처리 시스템 완료
- [ ] 로딩 상태 처리 완료

## 🌐 배포 플랫폼

### Frontend: Vercel
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
cd frontend
vercel --prod
```

### Backend: Render
```bash
# Render 대시보드에서 설정
# Build Command: npm ci && npm run build
# Start Command: npm start
# Environment: Node
```

## 🔧 환경 변수 설정

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-domain.com
VITE_APP_NAME=AIxStartup
VITE_APP_VERSION=1.0.0
```

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend-domain.com
```

## 📊 현재 상태

### ✅ 완료된 항목
- [x] 백엔드 API 서버 구현
- [x] 프론트엔드 React 앱 구현
- [x] API 연동 완료
- [x] 실시간 데이터 표시
- [x] 에러 처리 시스템
- [x] 로딩 상태 처리
- [x] 반응형 UI/UX
- [x] CORS 설정
- [x] 빌드 스크립트

### 🔄 배포 준비 완료
- [x] 프로덕션 빌드 성공
- [x] 배포 스크립트 생성
- [x] 환경 변수 템플릿
- [x] 배포 가이드 문서

## 🎯 배포 명령어

```bash
# 전체 배포
./scripts/deploy.sh

# 개별 빌드
cd backend && npm run build
cd frontend && npm run build

# 로컬 테스트
npm run dev
```

## 📞 배포 후 확인사항

1. **프론트엔드 접속**: `https://your-frontend-domain.com`
2. **백엔드 API**: `https://your-backend-domain.com/health`
3. **대시보드**: `https://your-frontend-domain.com/dashboard`
4. **API 연동 테스트**: 대시보드 하단의 테스트 섹션

## 🚨 문제 해결

### CORS 오류
- 백엔드 CORS 설정에서 프론트엔드 도메인 확인
- 환경 변수 `FRONTEND_URL` 설정 확인

### API 연결 실패
- 백엔드 서버 상태 확인
- 환경 변수 `VITE_API_URL` 설정 확인
- 네트워크 연결 상태 확인

### 빌드 오류
- Node.js 버전 확인 (18+ 권장)
- 의존성 설치 확인: `npm ci`
- TypeScript 컴파일 오류 확인


