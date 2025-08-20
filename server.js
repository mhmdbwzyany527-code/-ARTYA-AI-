const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
    const userMessage = (req.body.message || "").toString();

    try {
        const { data } = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "أنت ARTYA AI مساعد ذكي 🎨" },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 30000
            }
        );

        const reply = data?.choices?.[0]?.message?.content || "❌ لا يوجد رد";
        res.json({ reply });

    } catch (err) {
        const msg = err?.response?.data?.error?.message || err.message;
        res.status(500).json({ reply: "⚠️ خطأ: " + msg });
    }
});

app.listen(PORT, () => console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`));
