const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const sendBtn = document.getElementById("send");

function addMsg(text, who = "bot") {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addTyping() {
  const div = document.createElement("div");
  div.className = "msg bot";
  div.innerHTML = `<span class="typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div; // عشان نحذفه لاحقًا
}

async function sendMessage() {
  const text = (input.value || "").trim();
  if (!text) return;

  addMsg(text, "user");
  input.value = "";
  input.focus();

  sendBtn.disabled = true;
  const typing = addTyping();

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    typing.remove();
    addMsg(data.reply || "❌ لم يصل رد من الخادم.");
  } catch (e) {
    typing.remove();
    addMsg("⚠️ تعذر الاتصال بالخادم. تأكد أن الخادم يعمل وأن المفتاح مضبوط في Render.");
  } finally {
    sendBtn.disabled = false;
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// ترحيب أولي
addMsg("مرحبًا! أنا ARTYA AI. كيف أقدر أساعدك اليوم؟");
