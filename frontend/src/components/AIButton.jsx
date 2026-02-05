import React, { useState, useRef, useEffect } from "react";
import { X, Sparkles } from "lucide-react";

export default function AIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const conversationHistory = messages.map((m) => ({
      type: m.type,
      content: m.content,
    }));

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/fashion-chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage.content,
            conversationHistory,
          }),
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let aiMessage = { type: "assistant", content: "" };
      setMessages((prev) => [...prev, aiMessage]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.replace("data: ", "").trim();
            if (data === "[DONE]") {
              setLoading(false);
              return;
            }

            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;

            if (token) {
              aiMessage.content += token;
              setMessages((prev) => [...prev.slice(0, -1), aiMessage]);
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Open style assistant"
      >
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-6 transition-transform" />
      </button>

      
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Container */}
          <div className="fixed inset-0 md:inset-auto md:bottom-20 md:right-6 z-50 md:w-96 md:h-[500px] bg-white md:rounded-2xl shadow-2xl md:border-2 md:border-yellow-400 flex flex-col animate-slideUp">
            {/* Header */}
            <div className="flex justify-between items-center p-4 sm:p-5 bg-yellow-400 md:rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-base sm:text-lg">
                  Style Assistant
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-yellow-500 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8 px-4">
                  <Sparkles className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
                  <p className="text-sm sm:text-base mb-2">
                    Hi! I'm your style assistant.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Ask me about fashion trends, styling tips, or outfit ideas!
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] sm:max-w-[80%] text-sm sm:text-base break-words ${
                      msg.type === "user"
                        ? "bg-yellow-400 text-black rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <span
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-white md:rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && sendMessage()
                  }
                  placeholder="Ask about styling..."
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none text-sm sm:text-base"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-colors text-sm sm:text-base whitespace-nowrap"
                  aria-label="Send message"
                >
                  Send
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Press Enter to send
              </p>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
