import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

const SimilarArtistsSchema = z.object({
  artistName: z.string(),
  similar: z.array(
    z.object({
      name: z.string(),
      reason: z.string(),
      confidence: z.number().min(0).max(1).optional(),
    })
  ),
  reasoning: z.string().optional(),
});

type SimilarArtistsResult = {
  success: boolean;
  data?: z.infer<typeof SimilarArtistsSchema>;
  error?: string;
};

async function getArtistInfo(artistId: string) {
  try {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${artistId}&entity=album`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const artist = data.results[0];
      const albums = data.results.slice(1);
      
      const years = albums
        .map((album: any) => album.releaseDate ? new Date(album.releaseDate).getFullYear() : null)
        .filter((year:unknown)=> year !== null);
           
      return {
        name: artist.artistName,
        genre: artist.primaryGenreName || 'Unknown',
        years: years,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function generateSimilarArtists(artistId: string): Promise<SimilarArtistsResult> {
  try {
    const artistInfo = await getArtistInfo(artistId);
    
    if (!artistInfo) {
      return {
        success: false,
        error: 'Could not fetch artist details'
      };
    }

    const prompt = `You are a music expert. Analyze the artist "${artistInfo.name}" with this profile:

ARTIST PROFILE:
- Name: ${artistInfo.name}
- Primary genre: ${artistInfo.genre}
- Active years: ${artistInfo.years}

Based on this profile, suggest 3 similar artists that fans of "${artistInfo.name}" would enjoy.

Consider:
- Genre alignment and musical style (${artistInfo.genre})
- Era and time period context (${artistInfo.years})
- Vocal style, instrumentation, and production approach

Provide your response in this format:
- artistName: The name of the artist being analyzed
- similar: Array of 3 similar artists with:
  * name: Artist name
  * reason: Specific musical connection (max 50 words)
  * confidence: Similarity score (0-1)
- reasoning: Overall explanation of why these artists connect

Be insightful and avoid generic recommendations. Focus on meaningful musical connections.`;

    const result = await generateObject({
      model: openai('gpt-4o-mini'),
      prompt: prompt,
      schema: SimilarArtistsSchema,
    });

    return {
      success: true,
      data: result.object,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to generate similar artists',
    };
  }
}


