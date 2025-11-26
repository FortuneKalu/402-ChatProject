import { useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

const API_BASE = "http://127.0.0.1:5000";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load once when the app mounts
    fetchMessages();
  }, []);

  return (
    <div className="app-root">
      <div className="chat-container">
        <div className="chat-header-row">
          <h1 className="chat-title">Simple Chat</h1>
          <button
            className="refresh-button"
            onClick={fetchMessages}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <ChatWindow messages={messages} />

        <MessageInput onMessageSent={fetchMessages} />
      </div>
    </div>
  );
}

export default App;
