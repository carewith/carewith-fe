import axios from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_CLOUD_VISION_API_KEY}`,
      {
        requests: [
          {
            image: {
              content: image,
            },
            features: [
              {
                type: 'TEXT_DETECTION',
              },
            ],
          },
        ],
      }
    );
    const textAnnotations = response.data.responses[0].textAnnotations;
    const extractedText = textAnnotations ? textAnnotations[0].description : 'No text found';

    return new Response(JSON.stringify({ text: extractedText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error with Vision API:', error.response?.data || error.message);
    return new Response(JSON.stringify({ error: 'Failed to process image' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  return new Response('GET method is not allowed for this endpoint', {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}
