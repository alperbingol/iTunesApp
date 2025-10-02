'use client';

import { useState, useEffect, useCallback } from 'react';
import { searchItunes } from '@/app/actions';
import { EntityType, CountryCode, LanguageCode, SortOrder, ItunesSearchResult } from '@/lib/types';

import SearchInput from './SearchInput';
import EntityFilter from './EntityFilter';
import CountryFilter from './CountryFilter';
import LanguageFilter from './LanguageFilter';
import ExplicitFilter from './ExplicitFilter';
import SortFilter from './SortFilter';

interface MainSearchProps {
  onResultsChange: (results: ItunesSearchResult[]) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
}

export default function MainSearch({ onResultsChange, onSortOrderChange }: MainSearchProps) {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [entityFilter, setEntityFilter] = useState<EntityType>("musicArtist,album,song");
  const [allowExplicit, setAllowExplicit] = useState<boolean>(false);
  const [countryFilter, setCountryFilter] = useState<CountryCode>("US");
  const [languageFilter, setLanguageFilter] = useState<LanguageCode>("en_us");
  const [sortOrder, setSortOrder] = useState<SortOrder>('relevance');

  const handleSearch = useCallback(async () => {
    try {
      const data = await searchItunes(searchTerm, entityFilter, allowExplicit, countryFilter, languageFilter);
      onResultsChange(data.results);
    } catch (error) {
      console.error('Error during search:', error);
      onResultsChange([]);
    }
  }, [searchTerm, entityFilter, allowExplicit, countryFilter, languageFilter, onResultsChange]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      // Reset sort to relevance for both search term changes and filter changes
      setSortOrder('relevance');
      onSortOrderChange('relevance');
      
      const timer = setTimeout(() => {
        handleSearch();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [searchTerm, entityFilter, allowExplicit, countryFilter, languageFilter, handleSearch, onSortOrderChange]);

  const handleSortChange = (newSortOrder: SortOrder) => {
    setSortOrder(newSortOrder);
    onSortOrderChange(newSortOrder);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          iTunes Music Search
        </h1>
        <p className="text-gray-600">
          Discover music, artists, and albums from iTunes
        </p>
      </div>
      
      {/* Search Input */}
      <div className="max-w-md mx-auto">
        <SearchInput 
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
      </div>
      
      {/* Filters Row */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-4 sm:gap-6 items-end justify-center">
          <EntityFilter 
            value={entityFilter}
            onChange={setEntityFilter}
          />
          
          <CountryFilter 
            value={countryFilter}
            onChange={setCountryFilter}
          />
          
          <LanguageFilter 
            value={languageFilter}
            onChange={setLanguageFilter}
          />
          
          <ExplicitFilter 
            value={allowExplicit}
            onChange={setAllowExplicit}
          />
          
          <SortFilter 
            value={sortOrder}
            onChange={handleSortChange}
          />
        </div>
      </div>
    </div>
  );
}