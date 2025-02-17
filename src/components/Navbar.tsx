'use client';
import { Scale } from 'lucide-react';
import SearchBar from './SearchBar';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="bg-white border-b h-16 px-4">
      <div className="h-full max-w-[2000px] mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center space-x-2">
          <Scale className="w-6 h-6 text-[#102B3F]" />
          <span className="text-xl font-semibold text-[#102B3F]">MiLawd</span>
        </div>
        
        <div className="flex-1 max-w-2xl">
          <SearchBar onSearch={onSearch} />
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">Help</button>
          <button className="text-gray-600 hover:text-gray-900">Settings</button>
        </div>
      </div>
    </nav>
  );
}
