'use client';

import { SortOrder } from '@/lib/types';

interface SortFilterProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export default function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <div className="min-w-[120px]">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Sort by:
      </label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value as SortOrder)}
        className="border border-gray-300 rounded px-3 py-2 bg-white w-full"
      >
        <option value="relevance">Relevance</option>
        <option value="asc">Name A→Z</option>
        <option value="desc">Name Z→A</option>
      </select>
    </div>
  );
}