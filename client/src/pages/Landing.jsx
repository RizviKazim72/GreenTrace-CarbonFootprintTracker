import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, TrendingDown, Award, BarChart3, Users, Shield } from 'lucide-react';
import { Logo } from '@/components/brand';
import { Button, Card } from '@/components/ui';

const Landing = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Carbon Footprint Tracking',
      description: 'Calculate and monitor your company\'s carbon emissions across all operational scopes with real-time insights.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Green Points System',
      description: 'Earn points for reducing emissions and improving sustainability. Compete with industry leaders.',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Dynamic Leaderboard',
      description: 'See how your company ranks against competitors and industry benchmarks in real-time.',
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: 'Smart Recommendations',
      description: 'Get AI-powered suggestions to reduce your carbon footprint and improve sustainability.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Industry Comparisons',
      description: 'Compare your performance with industry averages and identify improvement opportunities.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Compliance Reports',
      description: 'Generate detailed sustainability reports for regulatory compliance and stakeholder transparency.',
    },
  ];

  const stats = [
    { value: '1000+', label: 'Companies Tracking' },
    { value: '50M+', label: 'Tons CO₂ Monitored' },
    { value: '30%', label: 'Avg. Reduction' },
    { value: '12+', label: 'Industries Covered' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-secondary-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size={36} />
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="md">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="md">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-slide-up text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6 shadow-sm">
                <Leaf size={16} />
                <span>Track, Analyze, Reduce</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight mb-6">
                Measure Your
                <span className="text-primary-600 block mt-2"> Carbon Footprint</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-secondary-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                GreenTrace helps companies track, analyze, and reduce their carbon emissions. 
                Join industry leaders in the journey towards sustainability.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl">
                    Start Tracking Free
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link to="/leaderboard/public" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Leaderboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative animate-fade-in hidden lg:block">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border border-secondary-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl border border-primary-100 hover:shadow-md transition-shadow">
                    <div>
                      <p className="text-xs sm:text-sm text-secondary-600 font-medium">Total Emissions</p>
                      <p className="text-xl sm:text-2xl font-bold text-secondary-900 mt-1">1,234 kg CO₂</p>
                      <p className="text-xs text-primary-600 mt-1">↓ 15% this month</p>
                    </div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
                    <div>
                      <p className="text-xs sm:text-sm text-secondary-600 font-medium">Green Points</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">8,567 pts</p>
                      <p className="text-xs text-green-600 mt-1">+245 this week</p>
                    </div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                    <div>
                      <p className="text-xs sm:text-sm text-secondary-600 font-medium">Industry Ranking</p>
                      <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">#12 in Tech</p>
                      <p className="text-xs text-blue-600 mt-1">Top 5% globally</p>
                    </div>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <TrendingDown className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-secondary-900 to-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-secondary-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
              Powerful Features
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              Everything You Need to Go Green
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-secondary-600 max-w-3xl mx-auto px-4">
              Comprehensive tools to track, analyze, and reduce your carbon footprint with actionable insights.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                hover 
                padding="lg" 
                className="h-full group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-primary-600 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-8 text-primary-50 max-w-2xl mx-auto">
            Join hundreds of companies already reducing their carbon footprint with GreenTrace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-primary-600 hover:bg-primary-50 shadow-xl">
                Get Started for Free
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <Logo variant="white" size={32} />
              <p className="text-secondary-400 mt-2 text-sm">Track. Analyze. Reduce.</p>
            </div>
            <div className="text-secondary-400 text-xs sm:text-sm text-center md:text-right">
              © 2025 GreenTrace. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
