document.getElementById("send").addEventListener("click", async () => {
    const input = document.getElementById("msg");
    const chat = document.getElementById("chat");

    const message = input.value.trim();
    if (!message) return;

    // رسالة المستخدم
    const userMsg = document.createElement("div");
    userMsg.textContent = "👤: " + message;
    chat.appendChild(userMsg);

    input.value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        const botMsg = document.createElement("div");
        botMsg.textContent = "🤖: " + data.reply;
        chat.appendChild(botMsg);

    } catch (err) {
        const errorMsg = document.createElement("div");
        errorMsg.textContent = "❌ خطأ في الاتصال بالسيرفر";
        chat.appendChild(errorMsg);
    }
});
