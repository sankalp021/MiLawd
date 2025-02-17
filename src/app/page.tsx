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
    <div className="min-h-screen bg-gray-100">
      <Navbar onSearch={handleSearch} />
      <main className="max-w-full px-3 py-3">
        <CaseDisplay searchQuery={searchQuery} />
      </main>
    </div>
  );
}
