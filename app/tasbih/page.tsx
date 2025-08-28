'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Settings,
  Sun,
  Moon,
  BookOpen,
  Target,
  Infinity,
  RotateCcw,
  Zap,
  Calendar,
  Award,
  TrendingUp,
  Volume2,
  VolumeX,
  Vibrate,
  MapPin,
  Clock,
  Book,
  Heart,
  Star,
  ArrowLeft,
  Menu,
  X,
  Home,
  Compass
} from 'lucide-react';
import Link from 'next/link';

export default function TasbihPage() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'counter' | 'tasks'>('counter');
  const [showMenu, setShowMenu] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Load theme preference
    const savedTheme = localStorage.getItem('tasbih-theme');
    setIsDark(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('tasbih-theme', newTheme ? 'dark' : 'light');
  };

  const themeClasses = {
    background: isDark
      ? "bg-gradient-to-br from-slate-900 via-emerald-900 to-amber-900"
      : "bg-gradient-to-br from-emerald-50 via-white to-amber-50",
    text: isDark ? "text-white" : "text-gray-900",
    subtitle: isDark ? "text-gray-300" : "text-gray-600",
    card: isDark ? "bg-gray-800/60 border-gray-700/50" : "bg-white/90 border-gray-200/50",
    button: isDark
      ? "bg-gray-700/80 hover:bg-gray-600/80 text-gray-300 hover:text-white"
      : "bg-gray-100/80 hover:bg-gray-200/80 text-gray-600 hover:text-gray-900",
    activeTab: isDark
      ? "bg-emerald-600 text-white"
      : "bg-emerald-500 text-white",
    accent: isDark ? "text-emerald-400" : "text-emerald-600",
    gold: isDark ? "text-amber-400" : "text-amber-600",
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 ${themeClasses.background}`}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-amber-500/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-amber-500/5 rounded-full blur-xl"></div>
        
        {/* Floating Prayer Beads */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${isDark ? 'bg-emerald-400/20' : 'bg-emerald-500/20'} animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

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
              <Target className={`w-6 h-6 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Digital Tasbih
              </h1>
              <p className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Count your Zikr
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
                href="/quran"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isDark ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setShowMenu(false)}
              >
                <BookOpen className="w-5 h-5" />
                <span>Quran</span>
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
        {/* Tab Navigation */}
        <div className={`flex rounded-xl p-1 mb-6 ${
          isDark ? 'bg-gray-800/50' : 'bg-gray-100/80'
        }`}>
          <button
            onClick={() => setActiveTab('counter')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
              activeTab === 'counter'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                : isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Counter</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
              activeTab === 'tasks'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                : isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Daily Tasks</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}