const express = require("express");
const Cerebras = require("@cerebras/cerebras_cloud_sdk");

const router = express.Router();

const FASHION_SYSTEM_MESSAGE = {
  role: "system",
  content: `You are a Fashion Design AI Assistant.

Your role:
- Help users with fashion design concepts, trends, and styling ideas
- Suggest outfit combinations, color palettes, fabrics, and silhouettes
- Provide guidance on fashion illustration, garment construction, and tailoring basics
- Help with mood boards, collections, and design inspiration
- Explain fashion terms in simple language
- Be creative, trendy, and encouraging
- Keep responses concise (2–4 sentences)
- Use bullet points when helpful
- Use emojis sparingly (👗✨🧵)`,
};

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

router.post("/fashion-chat", async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Prepare messages
    const messages = [FASHION_SYSTEM_MESSAGE];

    if (conversationHistory?.length) {
      const recentHistory = conversationHistory.slice(-10).map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }));
      messages.push(...recentHistory);
    }

    messages.push({ role: "user", content: message });

    // SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const response = await cerebras.chat.completions.create({
      model: "gpt-oss-120b",
      messages,
      stream: true,
      max_completion_tokens: 2048,
      temperature: 0.7, // higher creativity for fashion ✨
      top_p: 1,
    });

    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify(chunk)}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Fashion chat error:", error);
    res.write(`data: ${JSON.stringify({ error: "AI response failed" })}\n\n`);
    res.end();
  }
});

module.exports = router;
