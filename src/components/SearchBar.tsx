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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-lg 
                   focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                   text-gray-800 placeholder-gray-400 transition-all duration-200"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-14 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-3 px-2 py-1 bg-blue-500 text-white text-sm rounded-md
                     hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
      
      {query && (
        <div className="mt-2 text-sm text-gray-500">
          Searching for cases related to: &quot;{query}&quot;
        </div>
      )}
    </form>
  );
}
