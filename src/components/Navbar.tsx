'use client';
import { Scale, Menu } from 'lucide-react';
import SearchBar from './SearchBar';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="max-w-[2000px] mx-auto flex items-center justify-between gap-4">
          {/* Logo section */}
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-[#102B3F]" />
            <span className="text-xl font-semibold text-[#102B3F]">MiLawd</span>
          </div>

          {/* Search section - centered */}
          <div className="flex-1 max-w-2xl">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Actions section */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-gray-600 hover:text-gray-900 font-medium">Help</button>
            <button className="text-gray-600 hover:text-gray-900 font-medium">Settings</button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
}
