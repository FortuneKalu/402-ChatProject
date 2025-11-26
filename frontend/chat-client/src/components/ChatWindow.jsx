import { useEffect, useState } from "react";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await fetch("http://127.0.0.1:5000/messages");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-window">
      {messages.length === 0 && (
        <p className="chat-empty">No messages yet. Start the conversation!</p>
      )}
      {messages.map((m, i) => (
        <div className="chat-message" key={i}>
          <span className="chat-message-username">{m.username || "Anon"}</span>
          <span className="chat-message-text">{m.text}</span>
        </div>
      ))}
    </div>
  );
}
