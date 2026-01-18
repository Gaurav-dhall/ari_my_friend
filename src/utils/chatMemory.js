const CHAT_HISTORY_KEY = "ari_chat_history";
const CHAT_TIMESTAMP_KEY = "ari_chat_timestamp";

const MAX_DAYS = 30;

/* ------------------------------------
   Helpers
------------------------------------ */

const isExpired = (timestamp) => {
  if (!timestamp) return true;

  const now = Date.now();
  const diffInDays = (now - timestamp) / (1000 * 60 * 60 * 24);
  return diffInDays > MAX_DAYS;
};

/* ------------------------------------
   Public APIs
------------------------------------ */

// 1️⃣ Load chat history
export const loadChatHistory = () => {
  try {
    const savedAt = Number(localStorage.getItem(CHAT_TIMESTAMP_KEY));

    // Expired → clear
    if (isExpired(savedAt)) {
      clearChatHistory();
      return [];
    }

    const raw = localStorage.getItem(CHAT_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to load chat history", err);
    return [];
  }
};

// 2️⃣ Save chat history
export const saveChatHistory = (messages) => {
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    localStorage.setItem(CHAT_TIMESTAMP_KEY, Date.now().toString());
  } catch (err) {
    console.error("Failed to save chat history", err);
  }
};

// 3️⃣ Clear chat history
export const clearChatHistory = () => {
  localStorage.removeItem(CHAT_HISTORY_KEY);
  localStorage.removeItem(CHAT_TIMESTAMP_KEY);
};

// 4️⃣ Get memory for AI (last N msgs)
export const getMemoryForAI = (messages, limit = 8) => {
  return messages.slice(-limit).map((m) => ({
    role: m.sender === "user" ? "user" : "assistant",
    content: m.text,
  }));
};