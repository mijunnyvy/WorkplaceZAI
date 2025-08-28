'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Compass, 
  Clock, 
  Target, 
  Heart, 
  Star, 
  MessageCircle,
  Sun,
  Moon,
  ChevronRight,
  Sparkles,
  Calendar,
  MapPin,
  Settings,
  User,
  Bell,
  Menu,
  X,
  Zap,
  UserX,
  LogOut,
  Shield
} from 'lucide-react';

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userMode, setUserMode] = useState<'authenticated' | 'guest' | null>(null);
  const [hasAIAccess, setHasAIAccess] = useState(false);

  useEffect(() => {
    // Check theme
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    // Check user authentication status
    const mode = localStorage.getItem('userMode') as 'authenticated' | 'guest' | null;
    const aiAccess = localStorage.getItem('hasAIAccess') === 'true';
    
    setUserMode(mode);
    setHasAIAccess(aiAccess);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userMode');
    localStorage.removeItem('hasAIAccess');
    window.location.href = '/';
  };

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Assistant',
      description: 'Islamic guidance with AI',
      href: '/chat',
      color: 'emerald',
      requiresAuth: true
    },
    {
      icon: BookOpen,
      title: 'Holy Quran',
      description: 'Read with translations',
      href: '/quran',
      color: 'blue',
      requiresAuth: false
    },
    {
      icon: Compass,
      title: 'Qibla Direction',
      description: 'Find Mecca direction',
      href: '/qibla',
      color: 'purple',
      requiresAuth: false
    },
    {
      icon: Clock,
      title: 'Prayer Times',
      description: 'Accurate prayer timing',
      href: '/prayer-times',
      color: 'orange',
      requiresAuth: false
    },
    {
      icon: Target,
      title: 'Digital Tasbih',
      description: 'Count your dhikr',
      href: '/tasbih',
      color: 'teal',
      requiresAuth: false
    },
    {
      icon: Heart,
      title: 'Daily Adkar',
      description: 'Morning & evening',
      href: '/adkar',
      color: 'pink',
      requiresAuth: false
    },
    {
      icon: Star,
      title: '99 Names',
      description: 'Beautiful names of Allah',
      href: '/names',
      color: 'yellow',
      requiresAuth: false
    },
    {
      icon: Calendar,
      title: 'Islamic Calendar',
      description: 'Important dates',
      href: '/calendar',
      color: 'indigo',
      requiresAuth: false
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: 'from-emerald-500 to-teal-500',
      blue: 'from-blue-500 to-cyan-500',
      purple: 'from-purple-500 to-pink-500',
      orange: 'from-orange-500 to-red-500',
      teal: 'from-teal-500 to-cyan-500',
      pink: 'from-pink-500 to-rose-500',
      yellow: 'from-yellow-500 to-orange-500',
      indigo: 'from-indigo-500 to-purple-500'
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-emerald-900/10 to-gray-900' 
        : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 p-4 backdrop-blur-xl border-b ${
        isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              isDark 
                ? 'bg-emerald-600/20 border border-emerald-500/30' 
                : 'bg-emerald-100 border border-emerald-200'
            }`}>
              <Sparkles className={`w-6 h-6 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                YaQeen Muslim
              </h1>
              <p className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {userMode === 'authenticated' ? 'Premium User' : userMode === 'guest' ? 'Guest Mode' : 'Welcome'}
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-2">
            {/* User Status */}
            {userMode && (
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                userMode === 'authenticated'
                  ? isDark 
                    ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30'
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : isDark
                    ? 'bg-orange-900/30 text-orange-400 border border-orange-500/30'
                    : 'bg-orange-100 text-orange-700 border border-orange-200'
              }`}>
                {userMode === 'authenticated' ? (
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>AI Enabled</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <UserX className="w-3 h-3" />
                    <span>Guest</span>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className={`mt-4 p-4 rounded-xl ${
            isDark ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm border ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="space-y-3">
              {userMode === 'authenticated' ? (
                <>
                  <Link
                    href="/settings"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      isDark ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setShowMenu(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      isDark ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-600'
                    }`}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      isDark ? 'hover:bg-emerald-900/20 text-emerald-400' : 'hover:bg-emerald-50 text-emerald-600'
                    }`}
                    onClick={() => setShowMenu(false)}
                  >
                    <Zap className="w-5 h-5" />
                    <span>Unlock AI Features</span>
                  </Link>
                  <Link
                    href="/"
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      isDark ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setShowMenu(false)}
                  >
                    <ChevronRight className="w-5 h-5" />
                    <span>Back to Landing</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Assalamu Alaikum
          </h2>
          <p className={`text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {userMode === 'authenticated' 
              ? 'Welcome back! All features are available to you.' 
              : userMode === 'guest'
                ? 'Welcome! You\'re in guest mode with limited features.'
                : 'Welcome to your Islamic companion app.'
            }
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isRestricted = feature.requiresAuth && !hasAIAccess;
            
            return (
              <Link
                key={index}
                href={isRestricted ? '/auth' : feature.href}
                className={`group relative p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50' 
                    : 'bg-white/70 hover:bg-white border border-gray-200/50'
                } backdrop-blur-sm shadow-lg hover:shadow-xl ${
                  isRestricted ? 'opacity-60' : ''
                }`}
              >
                {isRestricted && (
                  <div className="absolute top-2 right-2">
                    <Shield className={`w-4 h-4 ${
                      isDark ? 'text-orange-400' : 'text-orange-600'
                    }`} />
                  </div>
                )}
                
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${getColorClasses(feature.color)} mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className={`text-sm font-semibold mb-1 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`text-xs ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
                
                {isRestricted && (
                  <div className={`mt-2 text-xs font-medium ${
                    isDark ? 'text-orange-400' : 'text-orange-600'
                  }`}>
                    Requires Account
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Guest Mode Notice */}
        {userMode === 'guest' && (
          <div className={`p-6 rounded-2xl mb-8 ${
            isDark ? 'bg-orange-900/20 border border-orange-500/30' : 'bg-orange-50/80 border border-orange-200/50'
          }`}>
            <div className="flex items-start space-x-4">
              <UserX className={`w-8 h-8 mt-1 ${
                isDark ? 'text-orange-400' : 'text-orange-600'
              }`} />
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  You're in Guest Mode
                </h3>
                <p className={`text-sm mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Create an account to unlock AI assistance, personalized recommendations, and cloud sync.
                </p>
                <Link
                  href="/auth"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Zap className="w-4 h-4" />
                  <span>Unlock AI Features</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-8">
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            May Allah guide us all on the straight path. Ameen.
          </p>
        </div>
      </main>
    </div>
  );
}
