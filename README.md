# Zeno AI - The Intelligent OS for Modern Builders

Zeno AI is a premium, multi-modal AI orchestrator built on the modern web stack. It dynamically routes tasks between the world's most powerful LLMs (GPT-4o, Claude 3.5 Sonnet, and Gemini Vision) to provide developers and creators with an all-in-one workspace.

## 🚀 Features

*   **Intelligent Orchestration:** Seamlessly chat with multiple AI models through a single unified interface.
*   **Vision & Image Generation:** Upload technical diagrams for analysis or generate hyper-realistic assets.
*   **Code Sandbox:** A dedicated Workstation UI designed for writing, executing, and debugging code.
*   **SaaS Ready:** Built-in Stripe billing integration and Upstash Redis rate limiting for production-ready deployment.
*   **Secure Authentication:** NextAuth powered authentication (Google, GitHub, and Credentials) backed by a Prisma SQLite database.
*   **Premium Design:** Meticulously crafted dark-mode UI utilizing Tailwind CSS glassmorphism, dynamic glow effects, and typography from the `brandguide.md`.

## 🏗️ Architecture Stack

*   **Framework:** Next.js 15 (App Router)
*   **Styling:** Tailwind CSS v4
*   **AI Engine:** Vercel AI SDK (v3.4)
*   **Database:** Prisma ORM (SQLite / PostgreSQL ready)
*   **Authentication:** NextAuth.js
*   **Payments:** Stripe Node SDK
*   **Rate Limiting:** Upstash Redis
*   **Deployment:** Docker (Multi-stage Alpine containerization)

## 📂 Project Structure

```text
/frontend
 ├── /src
 │   ├── /app
 │   │   ├── /api          # Backend routes (AI, Auth, Stripe)
 │   │   ├── /chat         # Unified AI Chat Interface
 │   │   ├── /code         # Developer Sandbox UI
 │   │   ├── /dashboard    # User Dashboard & Analytics
 │   │   ├── /image        # Vision & Image Generation UI
 │   │   ├── /login        # Authentication UIs
 │   │   ├── /pricing      # SaaS Stripe Billing UI
 │   │   ├── /projects     # Project Library & History
 │   │   └── page.tsx      # Marketing Landing Page
 │   └── /lib              # Shared utilities (Prisma, Stripe, Upstash, Auth)
 ├── /prisma
 │   └── schema.prisma     # Database schema definition
 ├── Dockerfile            # Production standalone deployment
 └── docker-compose.yml    # Local container orchestration
```

## 🛠️ Getting Started

### 1. Install Dependencies
Navigate to the `frontend` directory and install the packages:
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables
Create or edit the `.env` file in the `frontend` directory with your API keys:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secure_secret"

# AI Providers
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
GOOGLE_GENERATIVE_AI_API_KEY="AIza..."

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Upstash Redis
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

### 3. Initialize the Database
Push the Prisma schema to your local SQLite database:
```bash
npx prisma db push
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🐳 Docker Deployment

To launch the platform in a production-ready containerized environment:
```bash
docker compose up --build -d
```
This will compile the Next.js `standalone` build and mount the database volume securely.

---
*Built autonomously by Google Antigravity.*
