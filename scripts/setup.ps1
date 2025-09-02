# AIxStartup 프로젝트 설정 스크립트 (Windows PowerShell)

Write-Host "🚀 AIxStartup 프로젝트 설정을 시작합니다..." -ForegroundColor Green

# Node.js 버전 확인
Write-Host "📋 Node.js 버전 확인 중..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js 버전: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js가 설치되어 있지 않습니다. https://nodejs.org/에서 설치해주세요." -ForegroundColor Red
    exit 1
}

# npm 버전 확인
Write-Host "📋 npm 버전 확인 중..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm 버전: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm이 설치되어 있지 않습니다." -ForegroundColor Red
    exit 1
}

# 루트 의존성 설치
Write-Host "📦 루트 의존성 설치 중..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 루트 의존성 설치 완료" -ForegroundColor Green
} else {
    Write-Host "❌ 루트 의존성 설치 실패" -ForegroundColor Red
    exit 1
}

# 백엔드 의존성 설치
Write-Host "📦 백엔드 의존성 설치 중..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 백엔드 의존성 설치 완료" -ForegroundColor Green
} else {
    Write-Host "❌ 백엔드 의존성 설치 실패" -ForegroundColor Red
    exit 1
}
Set-Location ..

# 프론트엔드 의존성 설치
Write-Host "📦 프론트엔드 의존성 설치 중..." -ForegroundColor Yellow
Set-Location frontend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 프론트엔드 의존성 설치 완료" -ForegroundColor Green
} else {
    Write-Host "❌ 프론트엔드 의존성 설치 실패" -ForegroundColor Red
    exit 1
}
Set-Location ..

# 환경 변수 파일 생성
Write-Host "🔧 환경 변수 파일 생성 중..." -ForegroundColor Yellow
if (-not (Test-Path "backend\.env")) {
    Copy-Item "backend\env.example" "backend\.env"
    Write-Host "✅ 백엔드 환경 변수 파일 생성됨" -ForegroundColor Green
    Write-Host "⚠️  backend\.env 파일을 편집하여 실제 값으로 설정해주세요." -ForegroundColor Yellow
} else {
    Write-Host "✅ 백엔드 환경 변수 파일이 이미 존재합니다." -ForegroundColor Green
}

# 데이터베이스 설정
Write-Host "🗄️  데이터베이스 설정 중..." -ForegroundColor Yellow
Set-Location backend
npm run setup:db
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 데이터베이스 설정 완료" -ForegroundColor Green
} else {
    Write-Host "⚠️  데이터베이스 설정 실패 - PostgreSQL이 설치되어 있는지 확인해주세요." -ForegroundColor Yellow
}
Set-Location ..

Write-Host ""
Write-Host "🎉 AIxStartup 프로젝트 설정이 완료되었습니다!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 다음 단계:" -ForegroundColor Cyan
Write-Host "1. backend\.env 파일을 편집하여 데이터베이스 연결 정보를 설정하세요" -ForegroundColor White
Write-Host "2. PostgreSQL과 Redis가 실행 중인지 확인하세요" -ForegroundColor White
Write-Host "3. 'npm run dev' 명령어로 개발 서버를 시작하세요" -ForegroundColor White
Write-Host ""
Write-Host "🌐 개발 서버:" -ForegroundColor Cyan
Write-Host "   - 프론트엔드: http://localhost:3000" -ForegroundColor White
Write-Host "   - 백엔드 API: http://localhost:5000" -ForegroundColor White
Write-Host "   - 헬스체크: http://localhost:5000/health" -ForegroundColor White
Write-Host ""
Write-Host "📚 문서:" -ForegroundColor Cyan
Write-Host "   - README.md 파일을 참조하세요" -ForegroundColor White
Write-Host ""


