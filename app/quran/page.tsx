'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Volume2,
  Play,
  Pause,
  Download,
  Bookmark,
  Sun,
  Moon,
  ArrowLeft,
  Filter,
  Heart,
  Share,
  Eye,
  Headphones,
  Book,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Compass,
  Target,
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  Settings,
  Home
} from 'lucide-react';
import { getAllSurahsInfo, getSurahLengthCategory, type SurahInfo } from '@/lib/quranApi';

// Define the type for floating balls
type FloatingBall = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export default function QuranPage() {
  const [isDark, setIsDark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMode, setCurrentMode] = useState<'read' | 'listen' | 'study'>('read');
  const [surahs, setSurahs] = useState<SurahInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [lengthFilter, setLengthFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState('read');
  const [balls, setBalls] = useState<FloatingBall[]>([]);


  useEffect(() => {
    setMounted(true);
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    setIsDark(savedTheme === 'dark');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    // Load surahs
    const loadSurahs = async () => {
      try {
        const surahsData = await getAllSurahsInfo();
        setSurahs(surahsData);
      } catch (error) {
        console.error('Error loading surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSurahs();

    // Floating balls effect
    const createBalls = () => {
        const newBalls = Array.from({ length: 15 }).map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 20 + 10,
          opacity: Math.random() * 0.1 + 0.05,
        }));
        setBalls(newBalls);
      };
      createBalls();
  
      const animateBalls = () => {
        setBalls(prevBalls =>
          prevBalls.map(ball => {
            let newX = ball.x + ball.vx;
            let newY = ball.y + ball.vy;
  
            if (newX < 0 || newX > 100) ball.vx *= -1;
            if (newY < 0 || newY > 100) ball.vy *= -1;
  
            return { ...ball, x: newX, y: newY };
          })
        );
        requestAnimationFrame(animateBalls);
      };
  
      const animationFrameId = requestAnimationFrame(animateBalls);
  
      return () => cancelAnimationFrame(animationFrameId);

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

  const handleSurahClick = (surah: SurahInfo) => {
    console.log(`Opening Surah ${surah.number}: ${surah.englishName} in ${selectedMode} mode`)
    // Navigation will be handled by Link component
  }

  // Filter surahs based on search, type, and length
  const filteredSurahs = surahs.filter(surah => {
    const matchesSearch =
      surah.name.includes(searchQuery) ||
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.number.toString().includes(searchQuery)

    const matchesType = filterType === 'all' || surah.revelationType === filterType

    const matchesLength = lengthFilter === 'all' || getSurahLengthCategory(surah.numberOfAyahs) === lengthFilter

    return matchesSearch && matchesType && matchesLength
  })

  const themeClasses = {
    background: isDark
      ? "bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900"
      : "bg-gradient-to-br from-emerald-50 via-white to-teal-50",
    text: isDark ? "text-white" : "text-gray-900",
    subtitle: isDark ? "text-gray-300" : "text-gray-600",
    accent: isDark ? "text-emerald-400" : "text-emerald-600",
    card: isDark ? "bg-gray-800/60 border-gray-700/50" : "bg-white/90 border-gray-200/50",
    cardHover: isDark ? "hover:bg-gray-800/80 hover:border-gray-600/50" : "hover:bg-white/95 hover:border-gray-300/50",
    searchBar: isDark ? "bg-gray-800/80 border-gray-700/50 text-white placeholder-gray-400" : "bg-white/90 border-gray-200/50 text-gray-900 placeholder-gray-500",
    button: isDark
      ? "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white"
      : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white",
    modeButton: isDark
      ? "bg-gray-700/80 hover:bg-gray-600/80 text-gray-300 hover:text-white"
      : "bg-gray-100/80 hover:bg-gray-200/80 text-gray-600 hover:text-gray-900",
    activeMode: isDark
      ? "bg-emerald-600 text-white"
      : "bg-emerald-500 text-white",
    toggle: isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-200 border-gray-300 text-gray-900",
    grid: isDark ? "opacity-10" : "opacity-5",
    ball: isDark ? "bg-emerald-500" : "bg-emerald-400",
  }

  const getModeIcon = (mode: 'read' | 'listen' | 'study') => {
    switch (mode) {
      case 'read': return <Eye className="w-4 h-4" />
      case 'listen': return <Headphones className="w-4 h-4" />
      case 'study': return <Book className="w-4 h-4" />
    }
  }

  const getModeText = (mode: 'read' | 'listen' | 'study') => {
    switch (mode) {
      case 'read': return { ar: 'قراءة', en: 'Read' }
      case 'listen': return { ar: 'استماع', en: 'Listen' }
      case 'study': return { ar: 'دراسة', en: 'Study' }
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full relative overflow-hidden transition-all duration-700 ease-in-out ${themeClasses.background}`}>
      {/* Animated Grid Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${themeClasses.grid}`}
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? "#10b981" : "#34d399"} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? "#10b981" : "#34d399"} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Balls */}
      {balls.map((ball) => (
        <div
          key={ball.id}
          className={`absolute rounded-full ${themeClasses.ball} transition-colors duration-700 animate-pulse`}
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            opacity: ball.opacity,
            filter: "blur(0.5px)",
            boxShadow: isDark ? "0 0 20px rgba(16, 185, 129, 0.3)" : "0 0 20px rgba(52, 211, 153, 0.3)",
          }}
        />
      ))}

      {/* Header */}
      <header className={`sticky top-0 z-50 p-4 backdrop-blur-xl border-b ${
        isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
      }`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link
              href="/home"
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDark
                  ? 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className={`p-2 rounded-xl ${
              isDark
                ? 'bg-emerald-600/20 border border-emerald-500/30'
                : 'bg-emerald-100 border border-emerald-200'
            }`}>
              <BookOpen className={`w-6 h-6 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Holy Quran
              </h1>
              <p className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Read, Listen & Study
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-2">
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
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/home"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isDark ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setShowMenu(false)}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/qibla"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isDark ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setShowMenu(false)}
              >
                <Compass className="w-5 h-5" />
                <span>Qibla</span>
              </Link>
              <Link
                href="/tasbih"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isDark ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setShowMenu(false)}
              >
                <Target className="w-5 h-5" />
                <span>Tasbih</span>
              </Link>
              <Link
                href="/prayer-times"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isDark ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setShowMenu(false)}
              >
                <Clock className="w-5 h-5" />
                <span>Prayer Times</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className={`text-xl md:text-2xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            القرآن الكريم
          </h2>
          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Read, listen, and study the Holy Quran with translations and audio
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search surahs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Mode Toggle */}
        <div className={`flex rounded-xl p-1 mb-6 ${
          isDark ? 'bg-gray-800/50' : 'bg-gray-100/80'
        }`}>
          {(['read', 'listen', 'study'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setCurrentMode(mode)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
                currentMode === mode
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {getModeIcon(mode)}
                <span>{getModeText(mode).en}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.number}
              href={`/quran/${surah.number}`}
              className={`group p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50'
                  : 'bg-white/70 hover:bg-white border border-gray-200/50'
              } backdrop-blur-sm shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm`}>
                  {surah.number}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}>
                  {surah.numberOfAyahs} verses
                </div>
              </div>

              <h3 className={`text-lg font-bold mb-1 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {surah.englishName}
              </h3>

              <p className={`text-xl font-bold mb-2 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`} style={{fontFamily: 'serif'}}>
                {surah.name}
              </p>

              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {surah.englishNameTranslation}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {surah.revelationType}
                </span>
                <div className="flex items-center space-x-2">
                  {currentMode === 'listen' && (
                    <Play className={`w-4 h-4 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`} />
                  )}
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}