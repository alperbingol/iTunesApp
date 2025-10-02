// Here be type definitions

export interface ItunesSearchResult {
    artistName: string;          
    wrapperType: string; 
    trackId?: number;                
    trackName?: string;              
    trackTimeMillis?: number;       
    trackCount?: number;             
    collectionId?: number;          
    collectionName?: string;         
    artistId?: number;               
    artworkUrl100?: string;          
    releaseDate?: string;            
    primaryGenreName?: string;       
    trackExplicitness?: string;      
    collectionExplicitness?: string;
}

export interface ItunesApiResponse{
    resultCount: number;
    results: ItunesSearchResult[];
}

export type EntityType = "musicArtist,album,song" | "song" | "album" | "musicArtist"

export type CountryCode = 
  | "US"  
  | "GB"  
  | "CA"  
  | "AU"  
  | "DE"  
  | "FR"  
  | "JP"  
  | "ES"  
  | "IT"  
  | "BR"  
  | "TR"  

export interface Country {
    code: CountryCode;
    name: string;
    flag: string;
}

export const COUNTRIES: Country[] = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
    { code: "TR", name: "Turkey", flag: "🇹🇷" },
];

export type LanguageCode = 
  | "en_us" 
  | "ja_jp"; 

export interface Language {
  code: LanguageCode;
  name: string;
}

export const LANGUAGES: Language[] = [
  { code: "en_us", name: "English" },
  { code: "ja_jp", name: "Japanese" },
];

export type SortOrder = 'relevance' | 'asc' | 'desc';


export interface SimilarArtist {
  name: string;
  reason: string;
  confidence?: number;
}

export interface SimilarArtistsResponse {
  artist: {
    id: string;
    name: string;
  };
  similar: SimilarArtist[];
  reasoning?: string;
}

export interface SimilarArtistsApiResponse {
  success: boolean;
  data?: SimilarArtistsResponse;
  error?: string;
}