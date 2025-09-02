"use client";
import { useEffect, useRef, useState } from "react";
import { fetchWithTimeout } from "../lib/fetchWithTimeout";
import { mockSettings, type Settings } from "../lib/mocks/settings";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipLevel: string;
  isActive: boolean;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Settings | null>(null);
  const [usingMock, setUsingMock] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastInteraction = useRef<number>(Date.now());

  // 사용자 상호작용 추적(클릭/키입력 시 idle 타이머 리셋)
  useEffect(() => {
    const bump = () => (lastInteraction.current = Date.now());
    window.addEventListener("click", bump);
    window.addEventListener("keydown", bump);
    return () => {
      window.removeEventListener("click", bump);
      window.removeEventListener("keydown", bump);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const autoContinueWithMock = () => {
      if (cancelled) return;
      setUsingMock(true);
      console.info("[auto-continue] using mock");
      setData(mockSettings);
      setLoading(false);
    };

    // 3초간 사용자 액션 없으면 자동 진행
    const startIdleWatch = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        const idleFor = Date.now() - lastInteraction.current;
        if (idleFor >= 3000) autoContinueWithMock();
      }, 3000);
    };

    async function load() {
      startIdleWatch();
      try {
        // 설정 데이터 로드
        const settingsRes = await fetchWithTimeout("http://localhost:5001/api/settings", {
          headers: { "X-Using-Mock": "false" },
        }, 2800);
        
        // 사용자 프로필 데이터 로드
        const profileRes = await fetchWithTimeout("http://localhost:5001/api/user/profile", {
          headers: { "X-Using-Mock": "false" },
        }, 2800);

        if (!settingsRes.ok || !profileRes.ok) throw new Error(`HTTP Error`);
        
        const settingsJson = (await settingsRes.json()) as Settings;
        const profileJson = await profileRes.json();
        
        if (cancelled) return;
        
        setData(settingsJson);
        setUserProfile(profileJson.data);
        setEditForm({
          name: profileJson.data.name,
          email: profileJson.data.email,
          phone: profileJson.data.phone,
          address: profileJson.data.address
        });
        setLoading(false);
        if (idleTimer.current) clearTimeout(idleTimer.current);
      } catch (e) {
        // 네트워크 에러/타임아웃 → 목업으로 자동 진행
        autoContinueWithMock();
        // 목업 사용자 프로필 설정
        setUserProfile({
          id: "mock-user-123",
          name: "관리자 사용자",
          email: "admin@aixstartup.com",
          phone: "+82-10-1234-5678",
          address: "서울특별시 강남구 테헤란로 123",
          membershipLevel: "Pro",
          isActive: true
        });
        setEditForm({
          name: "관리자 사용자",
          email: "admin@aixstartup.com",
          phone: "+82-10-1234-5678",
          address: "서울특별시 강남구 테헤란로 123"
        });
      }
    }
    load();
    return () => {
      cancelled = true;
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setUserProfile(updatedProfile.data);
        setIsEditing(false);
        alert("프로필이 성공적으로 업데이트되었습니다.");
      } else {
        alert("프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      phone: userProfile?.phone || "",
      address: userProfile?.address || ""
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (confirm("로그아웃하시겠습니까?")) {
      // 로그아웃 로직
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-3">
        <div className="animate-pulse h-5 w-40 bg-gray-200 rounded" />
        <div className="text-sm text-gray-500">
          설정을 불러오는 중입니다… 응답이 없으면 3초 후 자동으로 계속 진행합니다.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {usingMock && (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">
          자동 계속 모드(목업 사용). 백엔드 연결 시 실제 값으로 자동 대체됩니다.
        </div>
      )}

      {/* 페이지 제목 */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-600 mt-1">계정 정보 및 환경 설정을 관리합니다.</p>
      </div>

      {/* 사용자 프로필 섹션 */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">사용자 프로필</h2>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              편집
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                저장
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                취소
              </button>
            </div>
          )}
        </div>

        {userProfile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{userProfile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{userProfile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{userProfile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{userProfile.address}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 회원등급 섹션 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">회원등급</h2>
        {userProfile && (
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
              <span className="font-semibold">{userProfile.membershipLevel}</span>
            </div>
            <div className="text-sm text-gray-600">
              현재 {userProfile.membershipLevel} 등급으로 이용 중입니다.
            </div>
          </div>
        )}
      </div>

      {/* 로그인/로그아웃 섹션 */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">계정 관리</h2>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            현재 로그인된 계정: {userProfile?.email}
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* 시스템 설정 섹션 */}
      {data && (
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">시스템 설정</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">테마</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="light" selected={data.theme === "light"}>라이트</option>
                <option value="dark" selected={data.theme === "dark"}>다크</option>
                <option value="system" selected={data.theme === "system"}>시스템</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">기능 설정</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" checked={data.features.abac} className="mr-2" />
                  <span className="text-sm text-gray-700">ABAC (속성 기반 접근 제어)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={data.features.rbac} className="mr-2" />
                  <span className="text-sm text-gray-700">RBAC (역할 기반 접근 제어)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={data.features.policyHotReload} className="mr-2" />
                  <span className="text-sm text-gray-700">정책 핫 리로드</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
