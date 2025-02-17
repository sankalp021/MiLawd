'use client';
import { Scale, Menu } from 'lucide-react';
import SearchBar from './SearchBar';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="px-3 py-2 md:py-3">
        <div className="max-w-[2000px] mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-8">
          <div className="flex w-full md:w-auto items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 md:w-6 md:h-6 text-[#102B3F]" />
              <span className="text-lg md:text-xl font-semibold text-[#102B3F]">MiLawd</span>
            </div>
            <div className="md:hidden">
              <button className="p-1 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="w-full md:flex-1 max-w-2xl">
            <SearchBar onSearch={onSearch} />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">Help</button>
            <button className="text-gray-600 hover:text-gray-900">Settings</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
