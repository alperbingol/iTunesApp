'use client';

import { LANGUAGES, LanguageCode } from '@/lib/types';

interface LanguageFilterProps {
  value: LanguageCode;
  onChange: (value: LanguageCode) => void;
}

export default function LanguageFilter({ value, onChange }: LanguageFilterProps) {
  return (
    <div className="min-w-[100px]">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Language:
      </label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value as LanguageCode)}
        className="border border-gray-300 rounded px-3 py-2 bg-white w-full"
      >
        {LANGUAGES.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}