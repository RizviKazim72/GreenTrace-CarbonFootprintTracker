import { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, Calendar, Filter, Award } from 'lucide-react';
import { Card } from '@/components/ui';
import { greenPointsService } from '@/lib/api/services';
import { formatNumber, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';

const PointsHistory = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchTransactions();
    fetchBalance();
  }, [filters.startDate, filters.endDate]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await greenPointsService.getHistory(
        filters.startDate || null,
        filters.endDate || null
      );
      // Backend returns Page object with content array
      setTransactions(data.content || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transaction history');
    } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async () => {
    try {
      const data = await greenPointsService.getBalance();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const getTransactionIcon = (points) => {
    return points > 0 ? (
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <TrendingUp className="w-5 h-5 text-green-600" />
      </div>
    ) : (
      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
        <TrendingDown className="w-5 h-5 text-red-600" />
      </div>
    );
  };

  const clearFilters = () => {
    setFilters({ startDate: '', endDate: '' });
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Wallet className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Green Points History</h1>
            <p className="text-xl text-green-100">
              Track your sustainability rewards and milestones
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Card */}
        <Card className="mb-8 bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="text-sm text-secondary-600 font-medium">Total Balance</p>
                  <p className="text-5xl font-bold text-green-600">{formatNumber(balance)}</p>
                  <p className="text-sm text-secondary-600 mt-1">Green Points</p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-secondary-600 uppercase tracking-wide mb-2">Your Impact</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-2xl font-bold text-green-600">{transactions.filter(t => t.points > 0).length}</p>
                      <p className="text-xs text-secondary-600">Earning Transactions</p>
                    </div>
                    <div className="pt-2 border-t border-secondary-200">
                      <p className="text-sm text-secondary-600">
                        Total Earned: <span className="font-semibold text-green-600">
                          {formatNumber(transactions.reduce((sum, t) => t.points > 0 ? sum + t.points : sum, 0))}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              {(filters.startDate || filters.endDate) && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-lg hover:bg-secondary-200 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Transactions */}
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-secondary-900 mb-6">Transaction History</h2>
            
            {loading ? (
              <div className="py-12 text-center">
                <div className="inline-flex items-center gap-2 text-secondary-600">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                  Loading transactions...
                </div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                  <Wallet className="w-8 h-8 text-secondary-400" />
                </div>
                <p className="text-secondary-600 mb-2">No transactions found</p>
                <p className="text-sm text-secondary-500">
                  {filters.startDate || filters.endDate
                    ? 'Try adjusting your date filters'
                    : 'Start calculating your carbon footprint to earn points!'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(transaction.points)}
                      <div>
                        <p className="font-semibold text-secondary-900">{transaction.activity}</p>
                        <p className="text-sm text-secondary-600">
                          {formatDate(transaction.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${
                        transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.points > 0 ? '+' : ''}{formatNumber(transaction.points)}
                      </p>
                      <p className="text-xs text-secondary-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Summary Stats */}
        {transactions.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            <Card className="bg-linear-to-br from-green-50 to-emerald-50">
              <div className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-secondary-600 mb-1">Total Earned</p>
                <p className="text-3xl font-bold text-green-600">
                  +{formatNumber(transactions.reduce((sum, t) => t.points > 0 ? sum + t.points : sum, 0))}
                </p>
              </div>
            </Card>

            <Card className="bg-linear-to-br from-red-50 to-rose-50">
              <div className="p-6 text-center">
                <TrendingDown className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-secondary-600 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-red-600">
                  {formatNumber(Math.abs(transactions.reduce((sum, t) => t.points < 0 ? sum + t.points : sum, 0)))}
                </p>
              </div>
            </Card>

            <Card className="bg-linear-to-br from-blue-50 to-cyan-50">
              <div className="p-6 text-center">
                <Filter className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-secondary-600 mb-1">Total Transactions</p>
                <p className="text-3xl font-bold text-blue-600">
                  {transactions.length}
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsHistory;
