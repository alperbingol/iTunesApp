interface ArtistCardProps {
  artist: {
    name: string;
    reason: string;
    confidence?: number;
  };
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-semibold text-gray-900 mb-2">
        🎵 {artist.name}
      </h3>
      <p className="text-gray-600 text-sm mb-2">
        {artist.reason}
      </p>
      {artist.confidence && (
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">Similarity:</span>
          <div className="bg-gray-200 rounded-full h-2 flex-1 max-w-20">
            <div 
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${artist.confidence * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">
            {Math.round(artist.confidence * 100)}%
          </span>
        </div>
      )}
    </div>
  );
} 