'use client';

import { useState } from 'react';
import { ItunesSearchResult, SortOrder } from '@/lib/types';

// Import main components
import MainSearch from '@/components/search/MainSearch';
import SearchResults from '@/components/result/SearchResults';

export default function Home() {
  // Minimal state - only for communication between main components
  const [results, setResults] = useState<ItunesSearchResult[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('relevance');

  return (
    <div className="font-sans min-h-screen w-full bg-gray-50">
      <main className="container mx-auto px-4 py-8 space-y-8">
        
        <MainSearch 
          onResultsChange={setResults}
          onSortOrderChange={setSortOrder}
        />
        
        <div className="flex justify-center">
          <SearchResults 
            results={results}
            sortOrder={sortOrder}
          />
        </div>
        
      </main>
    </div>
  );
}