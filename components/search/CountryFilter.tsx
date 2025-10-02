'use client';

import { COUNTRIES, CountryCode } from '@/lib/types';

interface CountryFilterProps {
  value: CountryCode;
  onChange: (value: CountryCode) => void;
}

export default function CountryFilter({ value, onChange }: CountryFilterProps) {
  return (
    <div className="min-w-[120px]">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Country Store:
      </label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value as CountryCode)}
        className="border border-gray-300 rounded px-3 py-2 bg-white w-full"
      >
        {COUNTRIES.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}