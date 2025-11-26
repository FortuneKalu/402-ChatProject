import { useState } from "react";

const API_BASE = "http://127.0.0.1:5000";

export default function MessageInput({ onMessageSent }) {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [sending, setSending] = useState(false);

  const sendMessage = async () => {
    if (!text.trim() || !username.trim() || sending) return;

    try {
      setSending(true);
      await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, text }),
      });

      setText("");

      // Ask parent to refresh messages
      if (typeof onMessageSent === "function") {
        onMessageSent();
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="message-input">
      <input
        className="input username-input"
        placeholder="Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="input message-text-input"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button className="send-button" onClick={sendMessage} disabled={sending}>
        {sending ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
