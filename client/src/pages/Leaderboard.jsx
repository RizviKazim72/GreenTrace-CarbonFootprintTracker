import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Filter, Search, Medal } from 'lucide-react';
import { Card, Button, Input } from '@/components/ui';
import { leaderboardService } from '@/lib/api/services';
import { formatNumber } from '@/lib/utils';
import { INDUSTRIES } from '@/constants';
import toast from 'react-hot-toast';

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);
  const [myRanking, setMyRanking] = useState(null);
  const [filters, setFilters] = useState({
    industry: 'all',
    search: '',
  });

  useEffect(() => {
    fetchLeaderboard();
    fetchMyRanking();
  }, [filters.industry]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // If industry filter is selected, use the industry-specific endpoint
      let data;
      if (filters.industry !== 'all') {
        data = await leaderboardService.getByIndustry(filters.industry);
      } else {
        data = await leaderboardService.getTopCompanies(null, 50);
      }
      setLeaderboard(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast.error('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRanking = async () => {
    try {
      const data = await leaderboardService.getMyRanking();
      setMyRanking(data);
    } catch (error) {
      console.error('Error fetching my ranking:', error);
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-amber-600 to-amber-800';
    return 'from-primary-500 to-primary-700';
  };

  const getRankIcon = (rank) => {
    if (rank <= 3) {
      return <Medal className="w-6 h-6" />;
    }
    return <span className="text-lg font-bold">#{rank}</span>;
  };

  const filteredLeaderboard = leaderboard.filter(company =>
    company.name.toLowerCase().includes(filters.search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Trophy className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
            <p className="text-xl text-primary-100">
              Companies leading the way in sustainability
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* My Ranking Card */}
        {myRanking && (
          <Card className="mb-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getRankColor(myRanking.rank)} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {getRankIcon(myRanking.rank)}
                  </div>
                  <div>
                    <p className="text-sm text-secondary-600 font-medium">Your Ranking</p>
                    <p className="text-2xl font-bold text-secondary-900">{myRanking.companyName}</p>
                    <p className="text-sm text-secondary-600">{myRanking.industry}</p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-sm text-secondary-600 mb-1">Green Points</p>
                  <p className="text-3xl font-bold text-primary-600">{formatNumber(myRanking.greenPoints)}</p>
                  <p className="text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    Top {Math.round((myRanking.rank / (leaderboard.length || 1)) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <div className="p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Industry Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <select
                  value={filters.industry}
                  onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
                >
                  <option value="all">All Industries</option>
                  {Object.entries(INDUSTRIES).map(([key, value]) => (
                    <option key={key} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Leaderboard Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b border-secondary-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Green Points
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-secondary-600 uppercase tracking-wider">
                    Emissions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="inline-flex items-center gap-2 text-secondary-600">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                        Loading leaderboard...
                      </div>
                    </td>
                  </tr>
                ) : filteredLeaderboard.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-secondary-600">
                      No companies found
                    </td>
                  </tr>
                ) : (
                  filteredLeaderboard.map((company, index) => {
                    const isMyCompany = myRanking && company.id === myRanking.companyId;
                    const rank = index + 1;
                    
                    return (
                      <tr
                        key={company.id}
                        className={`hover:bg-secondary-50 transition-colors ${
                          isMyCompany ? 'bg-primary-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`w-10 h-10 bg-gradient-to-br ${getRankColor(rank)} rounded-full flex items-center justify-center text-white font-bold shadow`}>
                            {rank <= 3 ? <Medal className="w-5 h-5" /> : rank}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-semibold text-secondary-900">
                              {company.name}
                              {isMyCompany && (
                                <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                                  You
                                </span>
                              )}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                          {company.industry}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <p className="text-lg font-bold text-primary-600">
                            {formatNumber(company.greenPoints)}
                          </p>
                          <p className="text-xs text-secondary-500">points</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <p className="text-sm font-medium text-secondary-900">
                            {formatNumber(company.totalFootprint)}
                          </p>
                          <p className="text-xs text-secondary-500">kg CO₂</p>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
