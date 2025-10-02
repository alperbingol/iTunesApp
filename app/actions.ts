'use server';

import {CountryCode, EntityType, ItunesApiResponse, LanguageCode} from '../lib/types';
import { DEFAULT_SEARCH_LIMIT } from '../lib/constants';


export async function searchItunes(
    searchTerm: string, 
    entityType: EntityType = "musicArtist,album,song", 
    allowExplicit: boolean = false,
    country: CountryCode = "US",
    language: LanguageCode = "en_us"
): Promise<ItunesApiResponse> {
    const explicitParam = allowExplicit ? 'Yes' : 'No';

    const url = `https://itunes.apple.com/search?media=music&entity=${entityType}&term=${searchTerm}&explicit=${explicitParam}&country=${country}&lang=${language}&limit=${DEFAULT_SEARCH_LIMIT}`;    
    const response = await fetch(url);
    
    const data: ItunesApiResponse = await response.json();

    let filteredResults = data.results;
    
    if (!allowExplicit) {
      filteredResults = data.results.filter(item => 
        item.trackExplicitness !== 'explicit' && 
        item.collectionExplicitness !== 'explicit'
      );
    }

    return {
      resultCount: filteredResults.length,
      results: filteredResults
    };
}