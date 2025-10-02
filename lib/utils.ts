// Here be supporting functions

import { ItunesSearchResult } from "./types";

// Data transformation for iTunes results
export interface DisplayResult {
  id: string;
  type: 'artist' | 'song' | 'album';
  title: string;
  subtitle: string;
  imageUrl?: string;
  metadata: {
    genre?: string;
    year?: string;
    duration?: string;
    trackCount?: number;
  };
  rawData: ItunesSearchResult;
}

export function transformResultForDisplay(result: ItunesSearchResult): DisplayResult {
  const baseId = result.artistId?.toString() || result.trackId?.toString() || result.collectionId?.toString() || Math.random().toString();
  
  switch (result.wrapperType) {
    case 'artist':
      return {
        id: `artist-${result.artistId}`,
        type: 'artist',
        title: result.artistName,
        subtitle: result.primaryGenreName || 'Artist',
        metadata: {
          genre: result.primaryGenreName,
        },
        rawData: result
      };

    case 'track':
      return {
        id: `track-${result.trackId}`,
        type: 'song',
        title: result.trackName || 'Unknown Track',
        subtitle: result.artistName,
        imageUrl: result.artworkUrl100,
        metadata: {
          genre: result.primaryGenreName,
          year: result.releaseDate ? new Date(result.releaseDate).getFullYear().toString() : undefined,
          duration: result.trackTimeMillis ? formatDuration(result.trackTimeMillis) : undefined,
        },
        rawData: result
      };

    case 'collection':
      return {
        id: `album-${result.collectionId}`,
        type: 'album',
        title: result.collectionName || 'Unknown Album',
        subtitle: result.artistName,
        imageUrl: result.artworkUrl100,
        metadata: {
          genre: result.primaryGenreName,
          year: result.releaseDate ? new Date(result.releaseDate).getFullYear().toString() : undefined,
          trackCount: result.trackCount,
        },
        rawData: result
      };

    default:
      return {
        id: `unknown-${baseId}`,
        type: 'song', // Default fallback
        title: result.trackName || result.collectionName || result.artistName || 'Unknown',
        subtitle: result.artistName || 'Unknown Artist',
        imageUrl: result.artworkUrl100,
        metadata: {},
        rawData: result
      };
  }
}

function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}


