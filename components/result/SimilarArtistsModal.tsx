'use client';

import { useState, useEffect, useCallback } from 'react';
import { SimilarArtistsApiResponse } from '@/lib/types';
import ArtistCard from './ArtistCard';

interface SimilarArtistsModalProps {
  isOpen: boolean;
  artistId: string | null;
  onClose: () => void;
}

export default function SimilarArtistsModal({ 
  isOpen, 
  artistId, 
  onClose 
}: SimilarArtistsModalProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SimilarArtistsApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSimilarArtists = useCallback(async () => {
    if (!artistId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      
      const response = await fetch(`/api/similar/${artistId}`);
      const result: SimilarArtistsApiResponse = await response.json();
      
      if (result.success) {
        setData(result);

      } else {
        setError(result.error || 'Failed to load similar artists');
        console.error('API Error:', result.error);
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Network Error:', err);
    } finally {
      setLoading(false);
    }
  }, [artistId]);


  useEffect(() => {
    if (isOpen && artistId) {
      fetchSimilarArtists();
    }
  }, [isOpen, artistId, fetchSimilarArtists]);

  const handleClose = () => {
    setData(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div 
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                Similar artists
              </h2>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Finding similar artists...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">❌ {error}</p>
                <button 
                  onClick={fetchSimilarArtists}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {data?.success && data.data && (
              <div className="space-y-4">
                {data.data.similar.map((artist, index) => (
                  <ArtistCard key={index} artist={artist} />
                ))}
                
                {data.data.reasoning && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">💡 Why these artists?</h4>
                    <p className="text-blue-800 text-sm">
                      {data.data.reasoning}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200">
            <button 
              onClick={handleClose}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}