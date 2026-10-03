import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Send the image to our Python FastAPI model server running on port 8001
    const pythonApiUrl = 'http://127.0.0.1:8001/predict';
    
    // Forward the form data directly
    const pythonResponse = await fetch(pythonApiUrl, {
      method: 'POST',
      body: formData,
    });

    if (!pythonResponse.ok) {
      const errorText = await pythonResponse.text();
      console.error("FastAPI Error:", errorText);
      throw new Error('Failed to get prediction from AI model');
    }

    const data = await pythonResponse.json();

    // Returns something like: { prediction: "dog", confidence: 85.5 }
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
