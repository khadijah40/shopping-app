import React, { useState, useRef } from "react";
import { X } from "lucide-react";

export default function AIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
              scrollToBottom();
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      >
        <svg
          className="w-7 h-7 group-hover:rotate-6 transition-transform"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-[420px] bg-white rounded-2xl shadow-2xl border-2 border-yellow-400 flex flex-col animate-slideUp">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-yellow-400 rounded-t-2xl">
            <h3 className="font-bold">Style Assistant ✨</h3>
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%] ${
                  msg.type === "user"
                    ? "ml-auto bg-yellow-100 text-right"
                    : "mr-auto bg-gray-100"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading && <p className="text-xs text-gray-400">Thinking… ✨</p>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about styling…"
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-yellow-400 px-3 rounded-lg font-medium"
            >
              Send
            </button>
          </div>
        </div>
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
