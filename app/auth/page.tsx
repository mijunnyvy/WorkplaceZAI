'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  Sun,
  Moon,
  Sparkles,
  LogIn,
  UserPlus,
  Shield,
  Zap,
  UserX
} from 'lucide-react';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'skip'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate Firebase auth
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Set user mode in localStorage
    localStorage.setItem('userMode', 'authenticated');
    localStorage.setItem('hasAIAccess', 'true');
    
    router.push('/home');
    setIsLoading(false);
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    // Simulate Google Firebase auth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Set user mode in localStorage
    localStorage.setItem('userMode', 'authenticated');
    localStorage.setItem('hasAIAccess', 'true');
    
    router.push('/home');
    setIsLoading(false);
  };

  const handleSkipMode = () => {
    // Set skip mode in localStorage
    localStorage.setItem('userMode', 'guest');
    localStorage.setItem('hasAIAccess', 'false');
    
    router.push('/home');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900'
        : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50'
    }`}>
      {/* Floating Islamic Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-pulse ${isDark ? 'text-emerald-400/10' : 'text-emerald-200/30'}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${1.5 + Math.random() * 2}rem`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {['🕌', '🌙', '⭐', '🤲', '📿', '✨', '☪️', '🕋'][i]}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link 
            href="/"
            className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 ${
              isDark 
                ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' 
                : 'hover:bg-white/50 text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>

          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl backdrop-blur-sm ${
              isDark 
                ? 'bg-emerald-600/20 border border-emerald-500/30' 
                : 'bg-emerald-100/80 border border-emerald-200/50'
            }`}>
              <Sparkles className={`w-6 h-6 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                YaQeen Muslim
              </h1>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl transition-all duration-300 backdrop-blur-sm ${
              isDark 
                ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50' 
                : 'bg-white/50 hover:bg-white/70 text-gray-600 hover:text-gray-900 border border-gray-200/50 shadow-sm'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center px-6 py-8">
        {/* Auth Container */}
        <div className="w-full max-w-md p-8 rounded-2xl">
          {/* Auth Mode Toggle and Login/Signup Form */}
          <div className={`flex rounded-xl p-1 mb-8 ${
              isDark ? 'bg-gray-700/50' : 'bg-gray-100/80'
            }`}>
            
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-3 px-3 rounded-lg font-medium transition-all duration-300 text-sm ${
                  authMode === 'login'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LogIn className="w-4 h-4 inline mr-1" />
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-3 px-3 rounded-lg font-medium transition-all duration-300 text-sm ${
                  authMode === 'signup'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserPlus className="w-4 h-4 inline mr-1" />
                Sign Up
              </button>
              <button
                onClick={() => setAuthMode('skip')}
                className={`flex-1 py-3 px-3 rounded-lg font-medium transition-all duration-300 text-sm ${
                  authMode === 'skip'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserX className="w-4 h-4 inline mr-1" />
                Skip
              </button>
            </div> {/* End button group */}
            
            {/* Skip Mode Content */}
            {authMode === 'skip' && (
              <div className="text-center space-y-6">
                <div className={`p-6 rounded-xl ${
                  isDark ? 'bg-orange-900/20 border border-orange-500/30' : 'bg-orange-50/80 border border-orange-200/50'
                }`}>
                  <UserX className={`w-12 h-12 mx-auto mb-4 ${
                    isDark ? 'text-orange-400' : 'text-orange-600'
                  }`} />
                  <h3 className={`text-lg font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Guest Mode
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Continue without an account. You'll have access to all Islamic features except AI assistance.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-gray-700/30' : 'bg-gray-50/80'
                  }`}>
                    <h4 className={`font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      ✅ Available Features:
                    </h4>
                    <ul className={`text-sm space-y-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <li>• Quran Reading & Audio</li>
                      <li>• Prayer Times & Qibla</li>
                      <li>• Digital Tasbih</li>
                      <li>• Daily Adkar & 99 Names</li>
                      <li>• Islamic Calendar & Stories</li>
                    </ul>
                  </div>

                  <div className={`p-4 rounded-xl ${
                    isDark ? 'bg-red-900/20 border border-red-500/30' : 'bg-red-50/80 border border-red-200/50'
                  }`}>
                    <h4 className={`font-semibold mb-2 ${
                      isDark ? 'text-red-400' : 'text-red-600'
                    }`}>
                      ❌ Restricted Features:
                    </h4>
                    <ul className={`text-sm space-y-1 ${
                      isDark ? 'text-red-300' : 'text-red-600'
                    }`}>
                      <li>• AI Islamic Assistant</li>
                      <li>• Personalized Recommendations</li>
                      <li>• Progress Tracking</li>
                      <li>• Cloud Sync</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Login/Signup Form */}
            {(authMode === 'login' || authMode === 'signup') && (
              <>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {authMode === 'signup' && (
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Full Name
                      </label>
                      <div className="relative">
                        <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                            isDark
                              ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                              : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                          placeholder="Enter your full name"
                          required={authMode === 'signup'}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          isDark
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          isDark
                            ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                          isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Zap className="w-5 h-5" />
                        <span>{authMode === 'login' ? 'Sign In with AI Access' : 'Create Account with AI Access'}</span>
                      </div>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                  <span className={`px-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    or continue with
                  </span>
                  <div className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                </div>

                {/* Google Auth */}
                <button
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    isDark
                      ? 'bg-gray-700/50 hover:bg-gray-600/50 text-white border-gray-600'
                      : 'bg-white/80 hover:bg-white text-gray-900 border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                    <Zap className="w-4 h-4" />
                  </div>
                </button>

                {/* AI Access Notice */}
                <div className={`mt-6 p-4 rounded-xl ${
                  isDark ? 'bg-emerald-900/20 border border-emerald-500/30' : 'bg-emerald-50/80 border border-emerald-200/50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className={`w-4 h-4 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`} />
                    <span className={`text-sm font-semibold ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      AI Access Included
                    </span>
                  </div>
                  <p className={`text-xs ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Get personalized Islamic guidance, smart recommendations, and AI-powered features with your account.
                  </p>
                </div>
              </>
            )}

            {/* Footer Text */}
            <div className="mt-8 text-center">
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </main>
      </div>
    );
}