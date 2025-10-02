'use client';

import { DisplayResult } from '@/lib/utils';

interface SearchResultCardProps {
  result: DisplayResult;
  onArtistClick?: (artistId: string, artistName: string) => void;
}

export default function SearchResultCard({ result, onArtistClick }: SearchResultCardProps) {
  const isArtist = result.type === 'artist';
  const artistId = result.rawData.artistId?.toString();
  
  const handleClick = () => {
    if (isArtist && artistId && onArtistClick) {
      onArtistClick(artistId, result.title);
    }
  };

  return (
    <div 
      className={`border rounded-lg p-4 bg-white shadow hover:shadow-md transition-all ${
        isArtist ? 'cursor-pointer hover:border-purple-300 hover:scale-105' : ''
      }`}
      onClick={handleClick}
    >
      {/* Image */}
      {result.imageUrl && (
        <div className="mb-3">
          <img 
            src={result.imageUrl} 
            alt={result.title}
            className="w-16 h-16 rounded object-cover mx-auto"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="text-center">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">
          {result.title}
        </h3>
        <p className="text-gray-600 text-xs mb-2">
          {result.subtitle}
        </p>
        
        {/* Type Badge */}
        <span className={`inline-block px-2 py-1 text-xs rounded-full mb-2 ${
          result.type === 'artist' ? 'bg-purple-100 text-purple-700' :
          result.type === 'song' ? 'bg-green-100 text-green-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {result.type}
        </span>
        

        {/* Metadata */}
        <div className="text-xs text-gray-500 space-y-1">
          {result.metadata.genre && (
            <div>{result.metadata.genre}</div>
          )}
          {result.metadata.year && (
            <div>{result.metadata.year}</div>
          )}
          {result.metadata.duration && (
            <div>{result.metadata.duration}</div>
          )}
          {result.metadata.trackCount && (
            <div>{result.metadata.trackCount} tracks</div>
          )}
        </div>

        {/* Click indicator for artists */}
        {isArtist && (
          <div className="text-xs text-purple-600 mt-2 font-medium">
            🎵 Click for similar artists
          </div>
        )}
      </div>
    </div>
  );
}