'use client';

import { EntityType } from '@/lib/types';

interface EntityFilterProps {
  value: EntityType;
  onChange: (value: EntityType) => void;
}

export default function EntityFilter({ value, onChange }: EntityFilterProps) {
  return (
    <div className="min-w-[140px]">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filter by:
      </label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value as EntityType)}
        className="border border-gray-300 rounded px-3 py-2 bg-white w-full"
      >
        <option value="musicArtist,album,song">All</option>
        <option value="song">Songs</option>
        <option value="album">Albums</option>
        <option value="musicArtist">Artists</option>
      </select>
    </div>
  );
}