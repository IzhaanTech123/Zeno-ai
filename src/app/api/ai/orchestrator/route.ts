import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export async function POST(req: Request) {
  // 1. Authenticate user
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { prompt, context } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 2. Zeno AI Orchestrator Logic - Request classification & Model selection
    // We use a fast model (Gemini Flash) to classify the user's intent
    const classification = await generateObject({
      model: google("gemini-1.5-flash"),
      system: `You are the brain of Zeno AI, an intelligent router. 
Analyze the user's prompt and determine the absolute best AI model for the task.
Routing logic:
- 'claude-3-5-sonnet': Best for coding, complex logical reasoning, UI/UX tasks, and Next.js/React.
- 'gpt-4o': Best for general robust assistance, text generation, data processing, and common sense.
- 'gemini-1.5-pro': Best for large context, research, long documents, multi-modal vision tasks.
- 'ollama': Best for privacy-focused, local fallback tasks.
`,
      prompt: `User Prompt: ${prompt}\n\nContext Length: ${context?.length || 0} characters.`,
      schema: z.object({
        selectedModel: z.enum(['claude-3-5-sonnet', 'gpt-4o', 'gemini-1.5-pro', 'ollama']),
        reason: z.string().describe("A short, 1-sentence explanation of why this model was chosen."),
        estimatedComplexity: z.enum(['low', 'medium', 'high']),
      })
    });

    // 3. Return the orchestration decision so the frontend can route the actual chat request
    return NextResponse.json({
      status: "success",
      message: "Orchestrator successfully routed the request",
      routedTo: classification.object.selectedModel,
      reason: classification.object.reason,
      complexity: classification.object.estimatedComplexity
    });

  } catch (error) {
    console.error("Orchestrator Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
