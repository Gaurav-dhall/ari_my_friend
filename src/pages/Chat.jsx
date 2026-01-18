import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import ChatScrollArea from '../components/ChatScrollArea';
import MoodDropdown from '../components/MoodDropdown';
import StatusTooltip from '../components/StatusTooltip';
import SettingsDialog from '../components/SettingsDialog';
import { chatWithAri } from '../../services/chatClient';
import ClearChatDialog from '../components/ClearChatDialog';
import { loadBehavior } from '../utils/behaviourStorage';
import {
  loadChatHistory,
  saveChatHistory,
  getMemoryForAI,
} from "../utils/chatMemory";

import { clearChatHistory } from "../utils/chatMemory";





const INITIAL_MESSAGES = [
  { id: 1, text: "Hey! How are you feeling today?", sender: 'ai', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
];


const WELCOME_MESSAGES = [
    "Ready to spill the tea? ☕ Or just vent about the weather?",
    "I've been waiting for you! Let's solve the world's problems... or just yours. 😉",
    "Bored? Stressed? Over it? I'm all ears (metaphorically). 👂",
    "Warning: I may be an AI, but my jokes are 100% organic. 🥦",
    "Let's chat! I promise not to judge your Netflix history. 🎬",
];

function getTypingDelay(text) {
  const base = Math.min(text.length * 40, 2000); // max 2s
  console.log(base);
  const random = Math.random() * 800;            // randomness
  console.log(random);
  return base + random;
}

function maybeSplitMessage(text) {
  if (text.length < 80) return [text];

  if (Math.random() > 0.6) {
    const splitIndex = text.indexOf(". ", 40);
    if (splitIndex !== -1) {
      return [
        text.slice(0, splitIndex + 1),
        text.slice(splitIndex + 2),
      ];
    }
  }

  return [text];
}

const Chat = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState(() => {
  const history = loadChatHistory();
  return history.length ? history : INITIAL_MESSAGES;
});
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
const [error, setError] = useState(null);

  // Select a random message once on mount
  const welcomeMessage = useMemo(() => {
    return WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];
  }, []);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (hasStarted) {
        scrollToBottom();
    }
  }, [messages, hasStarted]);

  useEffect(() => {
  if (messages.length) {
    saveChatHistory(messages);
  }
}, [messages]);


  const handleClearChat = () => {
    clearChatHistory();
    setMessages(INITIAL_MESSAGES);
    setHasStarted(false); // Optionally go back to welcome screen
  };

  const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!inputValue.trim()) return;

  const userMessage = {
    id: Date.now(),
    text: inputValue,
    sender: "user",
    timestamp: new Date().toISOString(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsTyping(true);
  setError(null);

  const memoryForAI = getMemoryForAI(messages);

  

  try {
    const response = await chatWithAri({
      message: userMessage.text,

      behavior: loadBehavior(),

      // later store this in localStorage
      memory: memoryForAI,
    });


    // 1️⃣ Split msg into chunks for human-like feel
    const messageParts = maybeSplitMessage(response.reply);

    for (const part of messageParts) {
       const aiMessage = {
        id: Date.now() + Math.random(),
        text: part,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };

      const delay = getTypingDelay(part);
      await new Promise(resolve => setTimeout(resolve, delay));

      setMessages((prev) => [...prev, aiMessage]);
    }

    // 2️⃣ Handle Follow-up Message (Human-like double text)
    if (response.followUp) {
      // Random wait before starting to type follow-up (3s - 6s)
      const thinkTime = 3000 + Math.random() * 3000;
      await new Promise(resolve => setTimeout(resolve, thinkTime));

      setIsTyping(true);

      const followUpDelay = getTypingDelay(response.followUp);
      await new Promise(resolve => setTimeout(resolve, followUpDelay));
      
      const followUpMsg = {
        id: Date.now() + Math.random(),
        text: response.followUp,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, followUpMsg]);
      setIsTyping(false);
    }
  } catch (err) {
    console.error(err);
    setError("Ari is feeling a bit off right now 😕");
  } finally {
    setIsTyping(false);
  }
};


  // ------------------------------------------------------------------
  // Welcome View
  // ------------------------------------------------------------------
  if (!hasStarted) {
      return (
          <div className="h-screen w-full flex flex-col md:flex-row bg-main text-main font-main overflow-hidden">
              {/* Left: Content */}
              <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-8 md:p-16 relative z-10">
                  <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="max-w-md text-center"
                  >
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-500/30">
                            A
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold font-soft mb-6 leading-tight">
                            Hi there! <br />
                            <span className="text-[rgb(var(--accent))]">It's Ari.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted mb-12 font-soft leading-relaxed">
                            "{welcomeMessage}"
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setHasStarted(true)}
                            className="
                                group relative
                                px-8 py-4
                                bg-white text-black
                                rounded-full
                                font-bold text-lg
                                shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]
                                hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]
                                transition-all duration-300
                                flex items-center gap-3 mx-auto
                            "
                        >
                            Let's Talk
                            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </motion.button>
                  </motion.div>
              </div>

              {/* Right: Visual */}
              <div className="w-full md:w-1/2 h-full relative overflow-hidden hidden md:block">
                  <div className="absolute inset-0 backdrop-blur-3xl" />
                  <img 
                      src="/ari_chat_section.png" 
                      alt="Abstract Digital Art" 
                      className="w-full h-full object-cover opacity-60 "
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-main))] via-transparent to-transparent" /> */}
              </div>
          </div>
      );
  }

  // ------------------------------------------------------------------
  // Chat Interface (Existing)
  // ------------------------------------------------------------------
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen flex flex-col bg-main text-main font-main overflow-hidden"
    >
      {/* Header */}
      <header className="px-4 py-3 bg-main/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-10 text-center">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
                A
                </div>
                <span className="absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-[rgb(var(--bg-main))]" />
            </div>
            <div className="flex flex-col text-left">
                <h1 className="font-semibold text-sm leading-tight">Ari</h1>
                <div className="scale-90 origin-left opacity-80">
                <StatusTooltip />
                </div>
            </div>
            </div>
            
            <div className="flex items-center gap-2">
                <ClearChatDialog onClear={handleClearChat} />
                <MoodDropdown />
                <SettingsDialog />
            </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden relative w-full">
        <ChatScrollArea>
          <div className="max-w-2xl mx-auto w-full flex flex-col justify-end min-h-[calc(100vh-140px)] px-4 py-6 space-y-6">
             <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[85%] sm:max-w-[70%] px-5 py-3 text-[15px] leading-relaxed shadow-sm
                        ${isUser 
                          ? 'bubble-user text-white rounded-2xl rounded-tr-sm' 
                          : 'bubble-friend text-main rounded-2xl rounded-tl-sm'
                        }
                      `}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                  

                );
              })}
             </AnimatePresence>
             {isTyping && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex justify-start"
  >
    <div className="bubble-friend px-4 py-2 rounded-2xl text-sm text-muted italic">
      Ari is typing…
    </div>
  </motion.div>
)}

             <div ref={bottomRef} />
          </div>
        </ChatScrollArea>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-main/90 backdrop-blur-lg border-t border-white/5 safe-area-bottom">
        <div className="max-w-2xl mx-auto w-full">
            <form 
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 bg-card rounded-[24px] p-1.5 pl-4 ring-1 ring-white/5 focus-within:ring-white/10 transition-all shadow-lg shadow-black/5"
            >
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-main placeholder-muted text-[16px] outline-none min-w-0 font-soft"
            />
            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                type="submit"
                disabled={!inputValue.trim()}
                className={`
                p-3 rounded-full flex-shrink-0 transition-colors
                ${inputValue.trim() ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'bg-white/5 text-muted cursor-not-allowed'}
                `}
            >
                <Send size={18} strokeWidth={2.5} />
            </motion.button>
            </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;