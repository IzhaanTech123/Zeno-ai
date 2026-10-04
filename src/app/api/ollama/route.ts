import { NextResponse } from 'next/server';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
const FASTAPI_URL = process.env.FASTAPI_URL || 'http://127.0.0.1:8001';

export async function GET() {
  try {
    // Attempt connection directly to Ollama
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      method: 'GET',
      next: { revalidate: 0 },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        status: 'online',
        service: 'Ollama Local LLM Backend',
        url: OLLAMA_BASE_URL,
        models: data.models?.map((m: { name: string }) => m.name) || [],
        default_model: 'qwen2.5:0.5b',
        free: true,
      });
    }

    // Fallback: Check if Python FastAPI backend has Ollama bridged
    const fastApiRes = await fetch(`${FASTAPI_URL}/ollama/status`, {
      method: 'GET',
    });
    if (fastApiRes.ok) {
      const fastApiData = await fastApiRes.json();
      return NextResponse.json(fastApiData);
    }

    return NextResponse.json(
      {
        status: 'offline',
        error: `Ollama service unreachable on ${OLLAMA_BASE_URL}`,
        free: true,
      },
      { status: 503 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { status: 'error', error: message, url: OLLAMA_BASE_URL },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, messages, model = 'qwen2.5:0.5b' } = body;

    if (!prompt && (!messages || messages.length === 0)) {
      return NextResponse.json(
        { error: 'Either "prompt" or "messages" array is required.' },
        { status: 400 }
      );
    }

    // If chat messages provided, use /api/chat
    if (messages && Array.isArray(messages)) {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json(
          { error: `Ollama chat error (${response.status})`, details: errorText },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json({
        status: 'success',
        model,
        message: data.message,
        reply: data.message?.content || '',
      });
    }

    // Single prompt generation via /api/generate
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Ollama generate error (${response.status})`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      status: 'success',
      model,
      reply: data.response || '',
      total_duration: data.total_duration,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal Ollama backend proxy error', details: message },
      { status: 500 }
    );
  }
}
