'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search cases..." }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-2.5 rounded-full border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400
                   bg-white text-gray-900"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-20 hover:bg-gray-100 p-1.5 rounded-full"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-3 px-4 py-1.5 bg-[#72b38b] text-white text-sm font-medium 
                   rounded-full hover:bg-[#428968] transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
