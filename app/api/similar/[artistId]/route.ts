import { NextRequest, NextResponse } from 'next/server';
import { generateSimilarArtists } from '@/services/ai/similar-artists';
import { SimilarArtistsApiResponse } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ artistId: string }> }
) {
  const { artistId } = await params;
  
  try {

    const aiResult = await generateSimilarArtists(artistId);
    if (!aiResult.success) {
      const errorResponse: SimilarArtistsApiResponse = {
        success: false,
        error: aiResult.error,
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    const response: SimilarArtistsApiResponse = {
      success: true,
      data: {
        artist: {
          id: artistId,
          name: aiResult.data!.artistName || 'Unknown Artist',
        },
        similar: aiResult.data!.similar,
        reasoning: aiResult.data!.reasoning,
      },
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('❌ API Error:', error);
    
    const errorResponse: SimilarArtistsApiResponse = {
      success: false,
      error: 'Internal server error',
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}