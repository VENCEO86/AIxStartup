const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// 간소화된 CORS 설정
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3005'],
  credentials: true
}));

app.use(express.json());

// 성능 최적화: 압축 및 캐싱
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5분 캐시
  next();
});

// 간단한 사용자 데이터베이스 (메모리)
let users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@aixstartup.com",
    password: "admin123", // 실제로는 해시된 비밀번호를 사용해야 함
    phone: "+82-10-1234-5678",
    address: "서울특별시 강남구 테헤란로 123",
    isAdmin: true,
    membershipLevel: "Pro",
    createdAt: "2024-01-01",
    lastLoginAt: new Date().toISOString()
  }
];

// Health check (빠른 응답)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: Date.now() });
});

// 회원가입 API
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    
    // 유효성 검사
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: '이름, 이메일, 비밀번호는 필수입니다.'
      });
    }
    
    // 이메일 중복 확인
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: '이미 존재하는 이메일입니다.'
      });
    }
    
    // 새 사용자 생성
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password, // 실제로는 bcrypt로 해시해야 함
      phone: phone || "",
      address: address || "",
      isAdmin: false,
      membershipLevel: "Basic",
      createdAt: new Date().toISOString(),
      lastLoginAt: null
    };
    
    users.push(newUser);
    
    // 비밀번호 제외하고 응답
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      success: true,
      message: '회원가입이 완료되었습니다.',
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({
      success: false,
      error: '회원가입 중 오류가 발생했습니다.'
    });
  }
});

// 로그인 API
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 유효성 검사
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: '이메일과 비밀번호를 입력해주세요.'
      });
    }
    
    // 사용자 찾기
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: '이메일 또는 비밀번호가 올바르지 않습니다.'
      });
    }
    
    // 마지막 로그인 시간 업데이트
    user.lastLoginAt = new Date().toISOString();
    
    // 비밀번호 제외하고 응답
    const { password: _, ...userWithoutPassword } = user;
    
    // 간단한 토큰 생성 (실제로는 JWT 사용)
    const token = `token_${user.id}_${Date.now()}`;
    
    res.json({
      success: true,
      message: '로그인 성공',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({
      success: false,
      error: '로그인 중 오류가 발생했습니다.'
    });
  }
});

// 사용자 프로필 조회 API
app.get('/api/user/profile', (req, res) => {
  try {
    // 실제로는 토큰 검증을 해야 함
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: '인증 토큰이 필요합니다.'
      });
    }
    
    // 토큰에서 사용자 ID 추출 (간단한 구현)
    const userId = token.split('_')[1];
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: '사용자를 찾을 수 없습니다.'
      });
    }
    
    // 비밀번호 제외하고 응답
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('프로필 조회 오류:', error);
    res.status(500).json({
      success: false,
      error: '프로필 조회 중 오류가 발생했습니다.'
    });
  }
});

// 사용자 프로필 업데이트 API
app.put('/api/user/profile', (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: '인증 토큰이 필요합니다.'
      });
    }
    
    const userId = token.split('_')[1];
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: '사용자를 찾을 수 없습니다.'
      });
    }
    
    // 사용자 정보 업데이트
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (phone) users[userIndex].phone = phone;
    if (address) users[userIndex].address = address;
    
    // 비밀번호 제외하고 응답
    const { password: _, ...userWithoutPassword } = users[userIndex];
    
    res.json({
      success: true,
      message: '프로필이 업데이트되었습니다.',
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('프로필 업데이트 오류:', error);
    res.status(500).json({
      success: false,
      error: '프로필 업데이트 중 오류가 발생했습니다.'
    });
  }
});

// Settings API (빠른 응답)
app.get('/api/settings', (req, res) => {
  const settings = {
    user: { id: "real-user-123", email: "admin@aixstartup.com" },
    org: { id: "real-org-456", name: "AIxStartup" },
    features: { abac: true, rbac: true, policyHotReload: false },
    theme: "light"
  };
  res.json(settings);
});

// Dashboard API (최적화된 응답)
app.get('/api/dashboard', (req, res) => {
  const dashboard = {
    totals: { sales: 12345000, purchases: 6789000, profit: 5556000 },
    topClients: [
      { name: "Alpha Co", sales: 5500000 },
      { name: "Beta Ltd", sales: 4200000 },
      { name: "Gamma Inc", sales: 2645000 }
    ],
    monthlyData: [
      { month: "2025-01", revenue: 100000, expense: 80000, profit: 20000 },
      { month: "2025-02", revenue: 120000, expense: 90000, profit: 30000 },
      { month: "2025-03", revenue: 150000, expense: 110000, profit: 40000 }
    ]
  };
  res.json(dashboard);
});

// Membership Levels API
app.get('/api/membership/levels', (req, res) => {
  const levels = [
    { level: "Basic", price: "무료", features: ["기본 기능"], limitations: ["100건 거래"] },
    { level: "Pro", price: "월 29,000원", features: ["고급 기능"], limitations: ["5명 사용자"] },
    { level: "Enterprise", price: "월 99,000원", features: ["모든 기능"], limitations: [] }
  ];
  res.json({ success: true, data: levels });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Simple Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth/register, /api/auth/login`);
  console.log(`⚙️  Settings: http://localhost:${PORT}/api/settings`);
  console.log(`📈 Dashboard: http://localhost:${PORT}/api/dashboard`);
  console.log(`👤 Profile: http://localhost:${PORT}/api/user/profile`);
  console.log(`🏆 Membership: http://localhost:${PORT}/api/membership/levels`);
});
