import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname,
        /* clientPayload */
      ) => {
        return {
          allowedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/webp',
            'video/mp4',
            'video/quicktime',
            'video/webm',
            'video/ogg'
          ],
          tokenPayload: JSON.stringify({
            // Optional client payload metadata can go here
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Will be called when file is successfully uploaded to blob
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Token generation failed' },
      { status: 400 }
    );
  }
}
