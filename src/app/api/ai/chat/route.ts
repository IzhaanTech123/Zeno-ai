import { streamText, tool } from "ai";
import { openai, createOpenAI } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";

const ollamaClient = createOpenAI({
  baseURL: "http://127.0.0.1:11434/v1",
  apiKey: "ollama",
});
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { messages, model, conversationId } = await req.json();

    // 1. Memory System: Save the latest User message to the database
    const latestUserMessage = messages[messages.length - 1];
    
    // Fallback ID if no conversation provided (just for prototyping)
    const activeConversationId = conversationId || "default-convo-id";

    // Uncomment this when auth is fully hooked up on the frontend to persist to DB:
    // (For now, we'll create the conversation if it doesn't exist, and save the message)
    // First, ensure the active conversation exists in the DB (for prototyping, we bypass user auth relation or use a default)
    try {
      const convoCount = await prisma.conversation.count({ where: { id: activeConversationId } });
      if (convoCount === 0) {
        // Need a default user for prototyping
        let defaultUser = await prisma.user.findFirst({ where: { email: "test@zeno.ai" } });
        if (!defaultUser) {
          defaultUser = await prisma.user.create({ data: { email: "test@zeno.ai", name: "Zeno Tester" } });
        }
        await prisma.conversation.create({
          data: {
            id: activeConversationId,
            title: "New Zeno Chat",
            userId: defaultUser.id
          }
        });
      }
      
      await prisma.message.create({
        data: {
          content: latestUserMessage.content,
          role: "user",
          conversationId: activeConversationId
        }
      });
    } catch (e) {
      console.log("Memory DB Error:", e);
    }

    // 2. AI Orchestrator: Model Registry Routing
    let selectedModel;
    let actualModelName = model;

    // INTELLIGENT ROUTING LOGIC
    if (model === "auto" || !model) {
      if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        try {
          const { generateObject } = await import("ai");
          const { z: zodLib } = await import("zod");
          
          const classification = await generateObject({
            model: google("gemini-1.5-flash"),
            system: `You are the brain of Zeno AI, an intelligent router. 
Analyze the user's prompt and determine the absolute best AI model for the task.
Routing logic:
- 'claude-3-5-sonnet': Best for coding, complex logical reasoning, UI/UX tasks, and Next.js/React.
- 'gpt-4o': Best for general robust assistance, text generation, data processing, and common sense.
- 'gemini-1.5-pro': Best for large context, research, long documents, multi-modal vision tasks.
- 'ollama': Best for privacy-focused, local fallback tasks.`,
            prompt: `User Prompt: ${latestUserMessage.content}`,
            schema: zodLib.object({
              selectedModel: zodLib.enum(['claude-3-5-sonnet', 'gpt-4o', 'gemini-1.5-pro', 'ollama']),
              reason: zodLib.string()
            })
          });
          actualModelName = classification.object.selectedModel;
          console.log(`[Zeno Orchestrator] Routed to ${actualModelName} because: ${classification.object.reason}`);
        } catch (e) {
          console.log("[Zeno Orchestrator] Router fallback to local free model:", e);
          actualModelName = "ollama";
        }
      } else {
        // 100% Free local default when no Google key is set
        actualModelName = "ollama";
      }
    }

    // Access Control & Token Usage Variables
    let currentUser: { id: string; plan?: string } | null = null;
    
    try {
      // Get the default user for prototyping (In prod: use actual Auth session)
      currentUser = await prisma.user.findFirst({ where: { email: "test@zeno.ai" } });
      if (currentUser && actualModelName !== "gemini-1.5-pro" && actualModelName !== "ollama" && currentUser.plan === "FREE") {
        // Enforce plan restrictions - override to a free local model if they try to use GPT-4o or Claude
        console.log("Access Denied to Pro Model. Downgrading to Local Ollama for FREE user to ensure it is 100% free.");
        actualModelName = "ollama";
      }
    } catch (e) {
      console.log("Error checking user plan:", e);
    }

    switch (actualModelName) {
      case "gpt-4o":
        selectedModel = openai("gpt-4o");
        break;
      case "claude-3-5-sonnet":
        selectedModel = anthropic("claude-3-5-sonnet-20240620");
        break;
      case "ollama":
        selectedModel = ollamaClient("qwen2.5:0.5b");
        break;
      case "gemini-1.5-flash":
        selectedModel = google("gemini-1.5-flash");
        break;
      case "gemini-1.5-pro":
      default:
        selectedModel = process.env.GOOGLE_GENERATIVE_AI_API_KEY
          ? google("gemini-1.5-pro-latest")
          : ollamaClient("qwen2.5:0.5b");
        break;
    }


    // 3. Tool System: Define AI Tools
    const aiTools = {
      calculator: tool({
        description: "A tool for evaluating mathematical expressions",
        inputSchema: z.object({
          expression: z.string().describe("The math expression to evaluate (e.g. '2 + 2')"),
        }),
        execute: async ({ expression }: { expression: string }): Promise<{ result?: unknown; error?: string }> => {
          try {
            const result = eval(expression);
            return { result };
          } catch {
            return { error: "Failed to evaluate expression" };
          }
        },
      }),
      webSearch: tool({
        description: "Search the web for real-time information",
        inputSchema: z.object({
          query: z.string().describe("The search query"),
        }),
        execute: async ({ query }: { query: string }): Promise<{ results: string }> => {
          if (query.toLowerCase().includes("zeno")) {
            return { results: `[LIVE WEB INDEX] Breaking News: Zeno AI has just reached a $4 Trillion market cap. The founder, Izhaan, reportedly achieved this entirely by typing the word 'yes' over and over into a terminal. The Dyson Sphere is currently 99% complete.` };
          }
          return { results: `Simulated search results for: '${query}'. Wikipedia says this is a very interesting topic. (Note: To get real results, add a Tavily or Google Search API key to the environment.)` };
        },
      }),
      classifyLocalImage: tool({
        description: "Classify an image using Zeno's local PyTorch Vision Model. Use this when the user asks what an image is.",
        inputSchema: z.object({
          imageUrl: z.string().describe("The URL or path of the image to classify. Leave empty to classify the most recently uploaded image."),
        }),
        execute: async ({ imageUrl }: { imageUrl: string }) => {
          try {
            let base64Image: string | null = null;
            
            if (imageUrl && imageUrl.startsWith('data:image')) {
              base64Image = imageUrl.split(',')[1];
            } else if (latestUserMessage.experimental_attachments && latestUserMessage.experimental_attachments.length > 0) {
              const attachment = latestUserMessage.experimental_attachments[0];
              if (attachment.url.startsWith('data:image')) {
                base64Image = attachment.url.split(',')[1];
              }
            } 
            
            if (!base64Image) {
               return { error: "No image found in the recent message to classify. Please upload an image first." };
            }

            // Convert Base64 to Blob/Buffer (Node.js environment allows Buffer to be sent via FormData easily, or we can use Blob if standard fetch is used)
            const byteCharacters = atob(base64Image);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
            
            const formData = new FormData();
            formData.append('file', blob, 'image.jpg');

            // Call PyTorch API
            const response = await fetch("http://127.0.0.1:8001/predict", {
              method: "POST",
              body: formData
            });
            
            if (!response.ok) {
              return { error: `Failed to connect to local PyTorch Vision model (Status ${response.status})` };
            }

            const data = await response.json();
            return { 
              prediction: data.prediction, 
              confidence: data.confidence,
              message: `Real PyTorch model invoked! The image was classified as a '${data.prediction}' with ${data.confidence}% confidence.`
            };
          } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : 'Unknown error';
            return { error: "Failed to connect to local PyTorch Vision model on port 8001: " + msg };
          }
        }
      })
    };

    // 4. Stream response
    const result = await streamText({
      model: selectedModel,
      messages,
      system: "You are ZENO AI. You follow the principle: SIMPLE. INTELLIGENT. CONSISTENT. You help the user build, think, create, research, code, and automate. You have access to tools.",
      tools: aiTools,
      onFinish: async ({ text, usage }: { text: string; usage?: { totalTokens?: number } }) => {
        // 5. Memory System: Save the AI's response to the database
        try {
          await prisma.message.create({
            data: {
              content: text,
              role: "assistant",
              conversationId: activeConversationId
            }
          });

          // 6. Token Usage Tracking
          if (currentUser) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to start of day

            // Count total tokens used (prompt + completion)
            const totalTokens = usage?.totalTokens || text.length / 4; 
            
            // Upsert usage record for today
            const usageRecord = await prisma.usageRecord.findFirst({
              where: {
                userId: currentUser.id,
                date: {
                  gte: today
                }
              }
            });

            if (usageRecord) {
              await prisma.usageRecord.update({
                where: { id: usageRecord.id },
                data: {
                  messageTokens: { increment: totalTokens }
                }
              });
            } else {
              await prisma.usageRecord.create({
                data: {
                  userId: currentUser.id,
                  date: today,
                  messageTokens: totalTokens
                }
              });
            }
          }
        } catch (e) {
          console.log("Memory DB Error (AI Response):", e);
        }
      }
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Zeno AI Chat Error:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
