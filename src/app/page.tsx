'use client';
import CaseDisplay from '@/components/CaseDisplay';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={handleSearch} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <CaseDisplay searchQuery={searchQuery} />
      </main>
    </div>
  );
}
