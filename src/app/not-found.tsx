'use client';
import { Scale, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Scale className="w-16 h-16 text-[#72b38b]" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          The case you're looking for might have been moved or doesn't exist.
        </p>

        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#72b38b] text-white rounded-full
                   hover:bg-[#428968] transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
