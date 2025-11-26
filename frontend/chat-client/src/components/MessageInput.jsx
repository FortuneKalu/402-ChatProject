import { useState } from "react";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");

  const sendMessage = async () => {
    if (!text.trim() || !username.trim()) return;

    await fetch("http://127.0.0.1:5000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, text }),
    });

    setText("");
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

      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}
