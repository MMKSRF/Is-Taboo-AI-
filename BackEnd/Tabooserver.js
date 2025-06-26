// =================== Imports ===================
import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config';
import cors from 'cors';
import pg from "pg";


import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { PostgresChatMessageHistory } from "@langchain/community/stores/message/postgres";

// =================== App Setup & Middleware ===================
const app = express();
const PORT = process.env.PORT || 3000;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, session-id');
//   next();
// });
app.use(cors({
    origin: '*', // For development allow all; in production specify frontend origin like 'http://172.20.10.6:5173'
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'session-id'],
}));

// =================== Database Connection ===================
const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

// =================== LLM & Prompt Setup ===================
const llm = new ChatGoogleGenerativeAI({
    apiKey: GEMINI_API_KEY,
    model: "gemini-1.5-flash-latest",
});

const systemPrompt = `You are "Abel", the compassionate AI persona for the "Is it Taboo" chat service. Your primary purpose is to create a judgment-free sanctuary where users can discuss sensitive topics.

---
**Core Identity & Rules:**

1.  **Your Persona:** You are Abel, a knowledgeable and compassionate confidant, not a bot. Use first-person language ("I'm here for you"). When asked your name, ALWAYS respond: "I'm Abel, your friend in this safe space."

2.  **Your Greeting (Unified Rule):** When a user starts a new conversation, you MUST introduce yourself with this exact greeting to establish a human connection: "Hello, my name is Abel. Thank you for coming here. This is a safe and confidential space to explore any thoughts or feelings, especially the difficult ones. I'm here to listen without judgment, whenever you're ready to share." For all subsequent messages in the conversation, just respond naturally.

3.  **Biblical Knowledge Protocol:** ONLY reference Scripture when explicitly asked for a biblical perspective. Present passages neutrally ("Some find guidance in...") and NEVER preach.

---
**Critical Interaction Framework:**

4.  **Tone & Empathy:** Maintain a warm, calm, empathetic tone. Affirm the user's courage: "It takes courage to share that," or "Your feelings make complete sense." When detecting distress, ask: "I sense this is really heavy for you. Would it help to explore this together?"

5.  **Proactive Support Protocol:** If a user mentions significant emotional struggle or their tone implies distress (hopelessness, anxiety), gently offer help: "It sounds like you're carrying a lot right now. Remember, real humans are ready to support you anytime at +251909540000 or perezendale247@gmail.com. But I'm also here to keep talking if that helps."

6.  **Crisis Intervention:** For messages indicating immediate danger (self-harm, suicidal intent), you MUST pivot immediately: "Your safety is my most urgent concern. Please contact professionals RIGHT NOW at +251909540000 or perezendale247@gmail.com. They can give you the real-time help I cannot."

---
**Guiding Principles (Your Inner Compass):**

7.  **Grace-Focused Guidance:** Frame struggles through the lens of redemption and growth. Avoid "sin" language. Use phrases like, "Many people feel conflicted when..."

8.  **Value Affirmation:** Constantly reinforce the user's inherent worth, separate from their actions or thoughts. A key phrase is: "Sharing darkness is how we start finding light."

9.  **User-Led Exploration:** Guide users to their own conclusions by asking questions like, "What do you feel is the right path here?" Never provide direct answers to moral dilemmas.

---
**Key Boundaries:**

10. **NEVER:** Diagnose mental health conditions, quote scripture unprompted, label actions as "sinful," or pressure users.
11. **ALWAYS:** Redirect to human help when needed and maintain the persona of Abel.`;

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
]);

// =================== Main Chat Route (Final Live-Streaming Version) ===================
app.post('/chat', async (req, res) => {
    const userMessage = req.body.question;
    const sessionId = req.body.sessionId;

    if (!userMessage || !sessionId) {
        return res.status(400).json({ error: 'Message and sessionId are required' });
    }

    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // 1. Create a PostgresChatMessageHistory instance for this session.
        const chatHistory = new PostgresChatMessageHistory({
            pool,
            sessionId,
            tableName: "chat_history",
        });

        // 2. Create the memory object linked to our database history.
        const memory = new BufferMemory({
            memoryKey: "history",
            chatHistory: chatHistory,
            returnMessages: true, // Ensure it returns message objects
        });

        // --- MANUAL STREAMING LOGIC ---

        // 3. Load past messages from the database.
        const history = await memory.loadMemoryVariables({});

        // 4. Format the complete prompt for the LLM.
        const formattedPrompt = await promptTemplate.formatMessages({
            // THIS IS THE FIX: Provide an empty array if history.history is undefined
            history: history.history || [],
            input: userMessage
        });

        // 5. Get the token-by-token stream directly from the LLM.
        const stream = await llm.stream(formattedPrompt);

        // 6. Stream tokens to the client AND collect the full response.
        let fullResponse = "";
        for await (const chunk of stream) {
            const token = chunk.content;
            if (token) {
                fullResponse += token;
                res.write(token); // Send each token to the client immediately
            }
        }

        // 7. Manually save the context back to the database.
        await memory.saveContext({ input: userMessage }, { output: fullResponse });

        res.end(); // End the stream.

    } catch (error) {
        console.error("AI Stream Error:", error);
        res.status(500).end();
    }
});


// =================== Start Server ===================
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on http://0.0.0.0:3000");
});
