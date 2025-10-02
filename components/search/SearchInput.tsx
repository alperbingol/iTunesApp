'use client';

interface SearchInputProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
}

export default function SearchInput({ 
  searchTerm, 
  onSearchTermChange 
}: SearchInputProps) {
  return (
    <input 
      type="text" 
      placeholder="Search..." 
      value={searchTerm} 
      onChange={(e) => onSearchTermChange(e.target.value)}
      className="w-full max-w-md border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />
  );
}