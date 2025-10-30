import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TrendingDown, Award, Target, Leaf, Calendar, Activity, Trophy } from 'lucide-react';
import { Card } from '@/components/ui';
import { useAuth } from '@/contexts';
import { companyService, carbonService, leaderboardService, greenPointsService } from '@/lib/api/services';
import { formatNumber, formatDate } from '@/lib/utils';

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEmissions: 0,
    greenPoints: 0,
    ranking: 0,
    reductionPercent: 0,
  });
  const [company, setCompany] = useState(null);
  const [recentCalculations, setRecentCalculations] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, [location.pathname]); // Refetch when navigation changes

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch company profile
      const companyData = await companyService.getProfile();
      setCompany(companyData);

      // Fetch green points balance
      const pointsData = await greenPointsService.getBalance();
      
      // Fetch recent calculations (Page response has 'content' array)
      const calculationsResponse = await carbonService.getHistory();
      const calculationsData = calculationsResponse?.content || calculationsResponse || [];
      setRecentCalculations(calculationsData.slice(0, 5));

      // Fetch ranking
      const rankingData = await leaderboardService.getMyRanking();

      // Calculate reduction percentage (mock for now)
      const reductionPercent = calculationsData.length > 1 
        ? Math.round(((calculationsData[0]?.totalEmissions - calculationsData[calculationsData.length - 1]?.totalEmissions) / calculationsData[calculationsData.length - 1]?.totalEmissions) * 100)
        : 0;

      setStats({
        totalEmissions: companyData?.totalFootprint || 0,
        greenPoints: pointsData?.balance || 0,
        ranking: rankingData?.rank || 0,
        reductionPercent: Math.abs(reductionPercent) || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Emissions',
      value: formatNumber(stats.totalEmissions),
      unit: 'kg CO₂',
      icon: <Leaf className="w-6 h-6" />,
      color: 'primary',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-600',
      change: stats.reductionPercent > 0 ? `-${stats.reductionPercent}%` : 'No data',
      changeColor: stats.reductionPercent > 0 ? 'text-green-600' : 'text-secondary-500',
    },
    {
      title: 'Green Points',
      value: formatNumber(stats.greenPoints),
      unit: 'pts',
      icon: <Award className="w-6 h-6" />,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      change: '+245 this week',
      changeColor: 'text-green-600',
    },
    {
      title: 'Industry Ranking',
      value: stats.ranking > 0 ? `#${stats.ranking}` : 'N/A',
      unit: company?.industry || '',
      icon: <Target className="w-6 h-6" />,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      change: 'Top 5%',
      changeColor: 'text-blue-600',
    },
    {
      title: 'Reduction',
      value: stats.reductionPercent,
      unit: '%',
      icon: <TrendingDown className="w-6 h-6" />,
      color: 'accent',
      bgColor: 'bg-accent-50',
      iconColor: 'text-accent-600',
      change: 'vs last month',
      changeColor: 'text-accent-600',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">
                Welcome back, {company?.name || 'Company'}!
              </h1>
              <p className="text-secondary-600 mt-1">Here's your carbon footprint overview</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/calculator')}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Calculate Emissions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary-600 mb-1">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-secondary-900">{stat.value}</p>
                    <span className="text-sm text-secondary-500">{stat.unit}</span>
                  </div>
                  <p className={`text-xs mt-2 ${stat.changeColor}`}>{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center ${stat.iconColor}`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section - Simple Visual Representation */}
        {recentCalculations.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <Card.Header>
                <Card.Title>Emissions Overview</Card.Title>
                <Card.Description>Your latest calculation breakdown</Card.Description>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-secondary-700">Scope 1 - Direct Emissions</span>
                      <span className="text-sm font-bold text-red-600">
                        {formatNumber(recentCalculations[0]?.scope1Emissions || 0)} kg
                      </span>
                    </div>
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${((recentCalculations[0]?.scope1Emissions || 0) / (recentCalculations[0]?.totalEmissions || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-secondary-700">Scope 2 - Electricity</span>
                      <span className="text-sm font-bold text-blue-600">
                        {formatNumber(recentCalculations[0]?.scope2Emissions || 0)} kg
                      </span>
                    </div>
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${((recentCalculations[0]?.scope2Emissions || 0) / (recentCalculations[0]?.totalEmissions || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-secondary-700">Scope 3 - Other Indirect</span>
                      <span className="text-sm font-bold text-accent-600">
                        {formatNumber(recentCalculations[0]?.scope3Emissions || 0)} kg
                      </span>
                    </div>
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <div 
                        className="bg-accent-500 h-2 rounded-full" 
                        style={{ width: `${((recentCalculations[0]?.scope3Emissions || 0) / (recentCalculations[0]?.totalEmissions || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title>Performance Summary</Card.Title>
                <Card.Description>Your sustainability metrics</Card.Description>
              </Card.Header>
              <Card.Body>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-secondary-600">Total Calculations</p>
                      <p className="text-2xl font-bold text-secondary-900">{recentCalculations.length}</p>
                    </div>
                    <Calendar className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-secondary-600">Latest Footprint</p>
                      <p className="text-2xl font-bold text-secondary-900">
                        {formatNumber(recentCalculations[0]?.totalEmissions || 0)}
                      </p>
                      <p className="text-xs text-secondary-500">kg CO₂</p>
                    </div>
                    <Leaf className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg">
                    <div>
                      <p className="text-sm text-secondary-600">Industry Position</p>
                      <p className="text-2xl font-bold text-secondary-900">#{stats.ranking}</p>
                    </div>
                    <Trophy className="w-10 h-10 text-primary-600" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Recent Calculations */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title>Recent Calculations</Card.Title>
                <Card.Description>Your latest carbon footprint calculations</Card.Description>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All
              </button>
            </div>
          </Card.Header>
          <Card.Body>
            {recentCalculations.length > 0 ? (
              <div className="space-y-4">
                {recentCalculations.map((calc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">
                          {formatDate(calc.createdAt)}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Period: {calc.period || 'Monthly'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-secondary-900">
                        {formatNumber(calc.totalEmissions)} kg
                      </p>
                      <p className="text-xs text-secondary-500">CO₂ emissions</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Leaf className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
                <p className="text-secondary-600 mb-2">No calculations yet</p>
                <p className="text-sm text-secondary-500 mb-4">Start tracking your carbon footprint</p>
                <button 
                  onClick={() => navigate('/calculator')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Calculate Now
                </button>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
