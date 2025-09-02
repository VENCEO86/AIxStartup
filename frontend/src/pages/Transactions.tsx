import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  X,
  ChevronDown
} from 'lucide-react';
import TransactionCharts from '../components/TransactionCharts';

interface Transaction {
  id: string;
  partnerType: 'new' | 'existing';
  partnerCompany: string;
  type: 'revenue' | 'expense';
  category: string;
  customCategory?: string;
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod?: string;
  notes?: string;
}

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      partnerType: 'new',
      partnerCompany: 'ABC 기술',
      type: 'revenue',
      category: '컨설팅',
      amount: 500000,
      description: '웹사이트 개발 서비스',
      date: '2024-01-15',
      status: 'completed',
      paymentMethod: '계좌이체',
      notes: '첫 번째 프로젝트 완료'
    },
    {
      id: '2',
      partnerType: 'existing',
      partnerCompany: 'XYZ 솔루션',
      type: 'expense',
      category: '마케팅',
      amount: 150000,
      description: '클라우드 서버 호스팅 비용',
      date: '2024-01-10',
      status: 'completed',
      paymentMethod: '신용카드',
      notes: '월 정기 결제'
    },
    {
      id: '3',
      partnerType: 'new',
      partnerCompany: 'DEF 시스템',
      type: 'revenue',
      category: '컨설팅',
      amount: 300000,
      description: 'IT 컨설팅 서비스',
      date: '2024-01-20',
      status: 'pending',
      paymentMethod: '계좌이체',
      notes: '진행 중인 프로젝트'
    },
    {
      id: '4',
      partnerType: 'existing',
      partnerCompany: 'GHI 마케팅',
      type: 'expense',
      category: '마케팅',
      amount: 80000,
      description: '온라인 광고 비용',
      date: '2024-01-12',
      status: 'completed',
      paymentMethod: '신용카드',
      notes: 'Google Ads 비용'
    },
    {
      id: '5',
      partnerType: 'new',
      partnerCompany: 'JKL 디자인',
      type: 'revenue',
      category: '디자인',
      amount: 250000,
      description: 'UI/UX 디자인 작업',
      date: '2024-01-18',
      status: 'completed',
      paymentMethod: '계좌이체',
      notes: '모바일 앱 디자인 완료'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'revenue' | 'expense'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');
  const [filterDate, setFilterDate] = useState('');
  const [filterPartnerType, setFilterPartnerType] = useState<'all' | 'new' | 'existing'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'partner'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // 새 거래 추가 폼 상태
  const [newTransaction, setNewTransaction] = useState({
    partnerType: 'new' as 'new' | 'existing',
    partnerCompany: '',
    type: 'revenue' as 'revenue' | 'expense',
    category: '유통',
    customCategory: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: '계좌이체',
    notes: ''
  });

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.partnerCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || transaction.type === filterType;
      const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
      const matchesDate = !filterDate || transaction.date === filterDate;
      const matchesPartnerType = filterPartnerType === 'all' || transaction.partnerType === filterPartnerType;
      const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
      
      return matchesSearch && matchesType && matchesStatus && matchesDate && matchesPartnerType && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'partner':
          comparison = a.partnerCompany.localeCompare(b.partnerCompany);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const totalRevenue = transactions
    .filter(t => t.type === 'revenue' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalRevenue - totalExpense;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ko-KR');
  };

  const getTypeBadge = (type: string) => {
    return type === 'revenue' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getPartnerTypeBadge = (partnerType: string) => {
    return partnerType === 'new' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800';
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTransaction.partnerCompany || !newTransaction.amount || !newTransaction.description) {
      alert('필수 항목을 입력해주세요.');
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      partnerType: newTransaction.partnerType,
      partnerCompany: newTransaction.partnerCompany,
      type: newTransaction.type,
      category: newTransaction.category === '기타' ? newTransaction.customCategory || '기타' : newTransaction.category,
      customCategory: newTransaction.customCategory,
      amount: parseInt(newTransaction.amount),
      description: newTransaction.description,
      date: newTransaction.date,
      status: 'completed',
      paymentMethod: newTransaction.paymentMethod,
      notes: newTransaction.notes
    };

    setTransactions([transaction, ...transactions]);
    setShowAddModal(false);
    
    // 폼 초기화
    setNewTransaction({
      partnerType: 'new',
      partnerCompany: '',
      type: 'revenue',
      category: '유통',
      customCategory: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: '계좌이체',
      notes: ''
    });
  };

  const TransactionModal: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {selectedTransaction ? '거래 내역 상세' : '새 거래 추가'}
          </h3>
          <button
            onClick={() => {
              setSelectedTransaction(null);
              setShowAddModal(false);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {selectedTransaction ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">거래처 구분</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPartnerTypeBadge(selectedTransaction.partnerType)}`}>
                  {selectedTransaction.partnerType === 'new' ? '신규거래처' : '기거래처'}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
                <p className="text-gray-900">{selectedTransaction.partnerCompany}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">거래 유형</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(selectedTransaction.type)}`}>
                  {selectedTransaction.type === 'revenue' ? '매출' : '매입'}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                <p className="text-gray-900">{selectedTransaction.category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">금액</label>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(selectedTransaction.amount)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(selectedTransaction.status)}`}>
                  {selectedTransaction.status === 'completed' ? '완료' : 
                   selectedTransaction.status === 'pending' ? '대기' : '취소'}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <p className="text-gray-900">{selectedTransaction.description}</p>
            </div>
            {selectedTransaction.paymentMethod && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">결제 방법</label>
                <p className="text-gray-900">{selectedTransaction.paymentMethod}</p>
              </div>
            )}
            {selectedTransaction.notes && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
                <p className="text-gray-900">{selectedTransaction.notes}</p>
              </div>
            )}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => {
                  setSelectedTransaction(null);
                  setShowAddModal(false);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                닫기
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAddTransaction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">거래처 구분</label>
                <select 
                  value={newTransaction.partnerType}
                  onChange={(e) => setNewTransaction({...newTransaction, partnerType: e.target.value as 'new' | 'existing'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="new">신규거래처</option>
                  <option value="existing">기거래처</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
                <input
                  type="text"
                  value={newTransaction.partnerCompany}
                  onChange={(e) => setNewTransaction({...newTransaction, partnerCompany: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="회사명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">거래 유형</label>
                <select 
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'revenue' | 'expense'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="revenue">매출</option>
                  <option value="expense">매입</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                <select 
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="유통">유통</option>
                  <option value="컨설팅">컨설팅</option>
                  <option value="마케팅">마케팅</option>
                  <option value="디자인">디자인</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              {newTransaction.category === '기타' && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">기타 카테고리</label>
                  <input
                    type="text"
                    value={newTransaction.customCategory}
                    onChange={(e) => setNewTransaction({...newTransaction, customCategory: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="카테고리를 직접 입력하세요"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">금액</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="금액을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                rows={3}
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="거래 내용을 설명하세요"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">결제 방법</label>
                <select 
                  value={newTransaction.paymentMethod}
                  onChange={(e) => setNewTransaction({...newTransaction, paymentMethod: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="계좌이체">계좌이체</option>
                  <option value="신용카드">신용카드</option>
                  <option value="현금">현금</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
                <input
                  type="text"
                  value={newTransaction.notes}
                  onChange={(e) => setNewTransaction({...newTransaction, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="추가 메모"
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                추가
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">거래 내역</h1>
              <p className="text-gray-600 mt-2">모든 거래 내역을 추적하고 관리하세요</p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="w-5 h-5 mr-2" />
                내보내기
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                새 거래 추가
              </button>
            </div>
          </div>
        </div>

        {/* 데이터 시각화 차트 */}
        <TransactionCharts transactions={transactions} />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="거래 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">모든 유형</option>
              <option value="revenue">매출</option>
              <option value="expense">매입</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">모든 상태</option>
              <option value="completed">완료</option>
              <option value="pending">대기</option>
              <option value="cancelled">취소</option>
            </select>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as any);
                setSortOrder(order as any);
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date-desc">날짜 (최신순)</option>
              <option value="date-asc">날짜 (오래된순)</option>
              <option value="amount-desc">금액 (높은순)</option>
              <option value="amount-asc">금액 (낮은순)</option>
              <option value="partner-asc">거래처 (가나다순)</option>
            </select>
            <button 
              onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
              className={`inline-flex items-center justify-center px-4 py-2 border rounded-md transition-colors ${
                showAdvancedFilter 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5 mr-2" />
              고급 필터
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showAdvancedFilter ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* 고급 필터 확장 영역 */}
          {showAdvancedFilter && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">거래처 구분</label>
                  <select
                    value={filterPartnerType}
                    onChange={(e) => setFilterPartnerType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">모든 구분</option>
                    <option value="new">신규거래처</option>
                    <option value="existing">기거래처</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">모든 카테고리</option>
                    <option value="유통">유통</option>
                    <option value="컨설팅">컨설팅</option>
                    <option value="마케팅">마케팅</option>
                    <option value="디자인">디자인</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterType('all');
                      setFilterStatus('all');
                      setFilterDate('');
                      setFilterPartnerType('all');
                      setFilterCategory('all');
                    }}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    필터 초기화
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    거래 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    거래처 구분
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    금액
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    날짜
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-sm text-gray-500">{transaction.partnerCompany}</div>
                        <div className="text-sm text-gray-500">{transaction.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPartnerTypeBadge(transaction.partnerType)}`}>
                        {transaction.partnerType === 'new' ? '신규거래처' : '기거래처'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(transaction.type)}`}>
                        {transaction.type === 'revenue' ? '매출' : '매입'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'revenue' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(transaction.status)}`}>
                        {transaction.status === 'completed' ? '완료' : 
                         transaction.status === 'pending' ? '대기' : '취소'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setShowAddModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddModal && <TransactionModal />}
    </div>
  );
};

export default Transactions;
