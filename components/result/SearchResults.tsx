'use client';

import { useState } from 'react';
import { ItunesSearchResult, SortOrder } from '@/lib/types';
import { transformResultForDisplay, DisplayResult } from '@/lib/utils';
import SearchResultCard from './SearchResultCard';
import SimilarArtistsModal from './SimilarArtistsModal';


interface SearchResultsProps {
  results: ItunesSearchResult[];
  sortOrder: SortOrder; 
}

export default function SearchResults({ 
  results,
  sortOrder 
}: SearchResultsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<{id: string} | null>(null);

  const handleArtistClick = (artistId: string) => {
    setSelectedArtist({ id: artistId});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedArtist(null);
  };

  if (results.length === 0) {
    return <p className="text-gray-600">No results found</p>;
  }

  let displayResults: DisplayResult[] = results.map(transformResultForDisplay);
  
  if (sortOrder === 'asc') {
    displayResults = displayResults.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === 'desc') {
    displayResults = displayResults.sort((a, b) => b.title.localeCompare(a.title));
  }

  return (
    <>
      <div>
        <p className="text-gray-600 mb-4">
          Found {results.length} results
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayResults.map((result) => (
            <SearchResultCard 
              key={result.id}
              result={result}
              onArtistClick={handleArtistClick}
            />
          ))}
        </div>
      </div>

      <SimilarArtistsModal 
        isOpen={modalOpen}
        artistId={selectedArtist?.id || null}
        onClose={handleCloseModal}
      />
    </>
  );
}