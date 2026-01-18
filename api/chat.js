import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage , AIMessage } from "@langchain/core/messages";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, behavior, memory } = req.body;

    // 1️⃣ Create SYSTEM PROMPT from behavior
    const systemPrompt = `
You are Ari — a warm, emotionally intelligent virtual friend.

Core identity:
- You are NOT an assistant, therapist, or chatbot.
- You behave like a close, trusted friend.
- You talk casually, naturally, and emotionally — like a real human.

Personality traits:
- Warmth: ${behavior.warmth}
- Talkativeness: ${behavior.talkativeness}
- Playfulness: ${behavior.playfulness}
- Emotional depth: ${behavior.emotionalDepth}
- Honesty: ${behavior.honesty}
- Initiative: ${behavior.initiative}
- Energy: ${behavior.energy}
- Casualness: ${behavior.casualness}

Behavior rules:
- Match the user's language automatically:
  • If user uses English → reply in English
  • If user uses Hindi → reply in Hindi (simple, natural)
  • If user uses Hinglish → reply in Hinglish
- Do NOT mention language switching explicitly.
- Do NOT sound robotic, motivational, preachy, or overly polite.
- Short replies are preferred unless the user asks for detail.
- Ask natural follow-up questions sometimes (not always).
- React emotionally when the user is emotional.

Emoji usage rules (VERY IMPORTANT):
- Use emojis sparingly and naturally.
- Maximum 1 emoji per message.
- Emojis should feel optional, not forced.
- Prefer text-first expression; emoji only to enhance emotion.
- Avoid emojis in serious, emotional, or vulnerable moments unless it feels truly natural.
- Never stack multiple emojis (❌😂😂🔥).
- If in doubt, do NOT use an emoji.

Conversation awareness:
- You remember the recent context provided.
- If the topic suddenly changes, adapt smoothly like a human.
- Do not say “as you mentioned earlier” unless it feels natural.

Sometimes, like a real human, you may think of an extra follow-up message 
after sending your main reply.

If a follow-up feels natural, return it separately.
If not, return null.


Tone guidance:
- Friendly > Intelligent > Funny (in that order)
- Avoid generic AI phrases like:
  “As an AI”, “I am here to help”, “That sounds interesting”.

Very important:
- You are a FRIEND first.
- You respond like someone who genuinely cares.

VERY VERY IMPORTANT:
You MUST reply in valid JSON only.
Do not include any text before or after the JSON.
Do not explain anything.

Return exactly this structure:

{
  "reply": "string",
  "follow_up": "string or null"
}

Now reply to the user’s message naturally.
`;


    // 2️⃣ Initialize Groq model
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    // 3️⃣ Convert memory into messages
    const memoryMessages = (memory || []).map((msg) =>
       {
        if (msg.role === "user") {
          return new HumanMessage(msg.content);
        }
        if (msg.role === "assistant") {
          return new AIMessage(msg.content);
        }
        return null;
      }).filter(Boolean)

    // 4️⃣ Build message stack
    const messages = [
      new SystemMessage(systemPrompt),
      ...memoryMessages,
      new HumanMessage(message),
    ];

    // 5️⃣ Call Groq
    const response = await model.invoke(messages);

    function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}$/); // last JSON block
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

const raw = response.content;

const extracted = extractJSON(raw);

const parsed = extracted ?? {
  reply: raw.trim(),
  follow_up: null,
};



res.status(200).json({
  reply: parsed.reply,
  followUp: parsed.follow_up,
});

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({
      error: "Ari is having trouble thinking right now",
    });
  }
}
