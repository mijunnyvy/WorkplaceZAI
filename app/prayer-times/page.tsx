'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Settings,
  Sun,
  Moon,
  Calendar,
  BookOpen,
  Target,
  Compass,
  RefreshCw,
  Bell,
  Clock,
  Navigation,
  Share2,
  Book,
  Heart,
  Star,
  ArrowLeft,
  Menu,
  X,
  Home
} from 'lucide-react';
import Link from 'next/link';
import PrayerTimesContainer from '../../components/PrayerTimesContainer';
import NextPrayerHighlight from '../../components/NextPrayerHighlight';
import LocationSearch from '../../components/LocationSearch';
import SettingsPanel from '../../components/SettingsPanel';
import { usePrayerTimesStore } from '../../hooks/usePrayerTimesStore';

export default function PrayerTimesPage() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const {
    currentLocation,
    prayerTimes,
    currentPrayer,
    nextPrayer,
    timeToNextPrayer,
    settings,
    loading,
    error,
    getCurrentLocation,
    setLocation,
    fetchPrayerTimes,
    updateSettings,
  } = usePrayerTimesStore();

  useEffect(() => {
    setMounted(true);
    // Load theme preference
    const savedTheme = localStorage.getItem('prayer-times-theme');
    setIsDark(savedTheme === 'dark');
  }, []);

  // Auto-detect location on first load
  useEffect(() => {
    if (mounted && !currentLocation && !loading) {
      handleAutoDetectLocation();
    }
  }, [mounted, currentLocation, loading]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('prayer-times-theme', newTheme ? 'dark' : 'light');
  };

  const handleAutoDetectLocation = async () => {
    try {
      const location = await getCurrentLocation();
      if (location) {
        await setLocation(location);
      }
    } catch (error) {
      console.error('Error detecting location:', error);
    }
  };

  const handleRefreshPrayerTimes = async () => {
    if (currentLocation) {
      await fetchPrayerTimes(currentLocation);
    }
  };

  const handleSharePrayerTimes = async () => {
    if (!currentLocation || prayerTimes.length === 0) return;

    const todayPrayers = prayerTimes[0];
    const shareText = `Prayer Times for ${currentLocation.city}, ${currentLocation.country}\n\n` +
      `📅 ${new Date().toLocaleDateString()}\n` +
      `🌅 Fajr: ${todayPrayers.prayers.find(p => p.name === 'Fajr')?.time}\n` +
      `☀️ Dhuhr: ${todayPrayers.prayers.find(p => p.name === 'Dhuhr')?.time}\n` +
      `🌤️ Asr: ${todayPrayers.prayers.find(p => p.name === 'Asr')?.time}\n` +
      `🌅 Maghrib: ${todayPrayers.prayers.find(p => p.name === 'Maghrib')?.time}\n` +
      `🌙 Isha: ${todayPrayers.prayers.find(p => p.name === 'Isha')?.time}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Prayer Times',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        // You could show a toast notification here
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
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
    activeButton: isDark
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
        
        {/* Floating Prayer Icons */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-2xl ${isDark ? 'text-emerald-400/20' : 'text-emerald-500/20'} animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {['🕌', '🌙', '☀️', '🌅', '🌤️', '⭐', '🤲', '📿'][i]}
          </div>
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
              <Clock className={`w-6 h-6 ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
            </div>
            <div>
              <h1 className={`text-lg font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Prayer Times
              </h1>
              <p className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {currentLocation ? `${currentLocation.city}` : 'Islamic Schedule'}
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
                href="/tasbih"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isDark ? 'hover:bg-gray-700/50 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setShowMenu(false)}
              >
                <Target className="w-5 h-5" />
                <span>Tasbih</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => setShowLocationSearch(true)}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isDark
                ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50'
                : 'bg-white/70 hover:bg-white border border-gray-200/50'
            } backdrop-blur-sm shadow-lg hover:shadow-xl`}
          >
            <MapPin className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs font-medium">Location</span>
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isDark
                ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50'
                : 'bg-white/70 hover:bg-white border border-gray-200/50'
            } backdrop-blur-sm shadow-lg hover:shadow-xl`}
          >
            <Settings className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs font-medium">Settings</span>
          </button>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isDark
                ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50'
                : 'bg-white/70 hover:bg-white border border-gray-200/50'
            } backdrop-blur-sm shadow-lg hover:shadow-xl disabled:opacity-50`}
          >
            <RefreshCw className={`w-5 h-5 mx-auto mb-1 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-xs font-medium">Refresh</span>
          </button>

          <button
            onClick={handleShare}
            className={`p-3 rounded-xl transition-all duration-300 ${
              isDark
                ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50'
                : 'bg-white/70 hover:bg-white border border-gray-200/50'
            } backdrop-blur-sm shadow-lg hover:shadow-xl`}
          >
            <Share2 className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs font-medium">Share</span>
          </button>
        </div>

        {/* Next Prayer Highlight */}
        {nextPrayer && (
          <div className="mb-6">
            <NextPrayerHighlight
              nextPrayer={nextPrayer}
              timeToNext={timeToNextPrayer}
              currentPrayer={currentPrayer}
              isDark={isDark}
            />
          </div>
        )}

        {/* Prayer Times Container */}
        <PrayerTimesContainer
          prayerTimes={prayerTimes}
          currentPrayer={currentPrayer}
          nextPrayer={nextPrayer}
          loading={loading}
          error={error}
          isDark={isDark}
        />
      </main>

      {/* Location Search Modal */}
      {showLocationSearch && (
        <LocationSearch
          onLocationSelect={setLocation}
          onClose={() => setShowLocationSearch(false)}
          isDark={isDark}
        />
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsUpdate={updateSettings}
          onClose={() => setShowSettings(false)}
          isDark={isDark}
        />
      )}
    </div>
  );
}
