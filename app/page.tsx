'use client';

import Header from '../components/Header';
import Link from 'next/link';
import { ChevronRight, Landmark, BookOpen, Compass, Clock, Target, Calendar, Book, Heart, Star, MessageCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main className="p-6 bg-gray-100 dark:bg-gray-800">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          <Link href="/prayer-times">
            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-gray-900 dark:text-white" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Prayer Times
                  </h2>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </Link>
          <Link href="/quran">
            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-gray-900 dark:text-white" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Quran
                  </h2>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </Link>
          <Link href="/qibla">
            <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Compass className="w-6 h-6 text-gray-900 dark:text-white" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Qibla
                  </h2>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;