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



} from 'lucide-react';

interface Transaction {
  id: string;
  partnerName: string;
  partnerCompany: string;
  type: 'revenue' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  invoiceNumber?: string;
  paymentMethod?: string;
  notes?: string;
}

const Transactions: React.FC = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      partnerName: '김철수',
      partnerCompany: 'ABC 기술',
      type: 'revenue',
      category: '서비스 제공',
      amount: 500000,
      description: '웹사이트 개발 서비스',
      date: '2024-01-15',
      status: 'completed',
      invoiceNumber: 'INV-2024-001',
      paymentMethod: '계좌이체',
      notes: '첫 번째 프로젝트 완료'
    },
    {
      id: '2',
      partnerName: '이영희',
      partnerCompany: 'XYZ 솔루션',
      type: 'expense',
      category: '서버 호스팅',
      amount: 150000,
      description: '클라우드 서버 호스팅 비용',
      date: '2024-01-10',
      status: 'completed',
      paymentMethod: '신용카드',
      notes: '월 정기 결제'
    },
    {
      id: '3',
      partnerName: '박민수',
      partnerCompany: 'DEF 시스템',
      type: 'revenue',
      category: '컨설팅',
      amount: 300000,
      description: 'IT 컨설팅 서비스',
      date: '2024-01-20',
      status: 'pending',
      invoiceNumber: 'INV-2024-002',
      paymentMethod: '계좌이체',
      notes: '진행 중인 프로젝트'
    },
    {
      id: '4',
      partnerName: '최지영',
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
      partnerName: '정현우',
      partnerCompany: 'JKL 디자인',
      type: 'revenue',
      category: '디자인 서비스',
      amount: 250000,
      description: 'UI/UX 디자인 작업',
      date: '2024-01-18',
      status: 'completed',
      invoiceNumber: 'INV-2024-003',
      paymentMethod: '계좌이체',
      notes: '모바일 앱 디자인 완료'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'revenue' | 'expense'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');
  const [filterDate, setFilterDate] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'partner'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.partnerCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || transaction.type === filterType;
      const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
      const matchesDate = !filterDate || transaction.date === filterDate;
      
      return matchesSearch && matchesType && matchesStatus && matchesDate;
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
          comparison = a.partnerName.localeCompare(b.partnerName);
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
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
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

  const TransactionModal: React.FC = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {selectedTransaction ? '거래 내역 상세' : '새 거래 추가'}
        </h3>
        {selectedTransaction ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">파트너명</label>
                <p className="text-gray-900">{selectedTransaction.partnerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
                <p className="text-gray-900">{selectedTransaction.partnerCompany}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">거래 유형</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(selectedTransaction.type)}`}>
                  {selectedTransaction.type === 'revenue' ? '수입' : '지출'}
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
            {selectedTransaction.invoiceNumber && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">송장번호</label>
                <p className="text-gray-900">{selectedTransaction.invoiceNumber}</p>
              </div>
            )}
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
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">파트너명</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">회사명</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">거래 유형</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="revenue">수입</option>
                  <option value="expense">지출</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="service">서비스 제공</option>
                  <option value="consulting">컨설팅</option>
                  <option value="hosting">서버 호스팅</option>
                  <option value="marketing">마케팅</option>
                  <option value="design">디자인</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">금액</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">날짜</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 수입</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 지출</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpense)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">순이익</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(netProfit)}
                </p>
              </div>
            </div>
          </div>
        </div>

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
              <option value="revenue">수입</option>
              <option value="expense">지출</option>
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
              <option value="partner-asc">파트너 (가나다순)</option>
            </select>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              <Filter className="w-5 h-5 mr-2" />
              고급 필터
            </button>
          </div>
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
                        <div className="text-sm text-gray-500">{transaction.partnerName} - {transaction.partnerCompany}</div>
                        <div className="text-sm text-gray-500">{transaction.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(transaction.type)}`}>
                        {transaction.type === 'revenue' ? '수입' : '지출'}
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
