'use client';
import { Scale, Search, BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-[#102B3F] text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Scale className="w-6 h-6" />
          <span className="text-xl font-semibold">MiLawd</span>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 hover:text-blue-300 transition-colors">
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-300 transition-colors">
            <BookOpen className="w-5 h-5" />
            <span>Documentation</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
