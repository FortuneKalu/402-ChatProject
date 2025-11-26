// App.jsx
// Root component for the chat app.
// Responsible for:
//   - Holding the messages state
//   - Fetching messages from the Flask server
//   - Clearing all messages via a DELETE request
//   - Passing messages + callbacks down to child components

import { useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

// Base URL for the backend API.
// If you change the Flask port or host, update this.
const API_BASE = "http://127.0.0.1:5000";

function App() {
  // messages: array of message objects from the server
  const [messages, setMessages] = useState([]);

  // loading: used to show "Refreshing..." on the button
  const [loading, setLoading] = useState(false);

  // clearing: used to show "Clearing..." on the Clear button
  const [clearing, setClearing] = useState(false);

  // -----------------------------
  // Fetch messages from backend
  // -----------------------------
  const fetchMessages = async () => {
    try {
      setLoading(true); // indicate that a refresh is in progress

      const res = await fetch(`${API_BASE}/messages`);
      const data = await res.json();

      // Update local state with the data we got from Flask.
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Clear all messages in backend
  // -----------------------------
  const clearMessages = async () => {
    try {
      setClearing(true); // indicate that clearing is in progress

      // Call the DELETE route we defined in Flask.
      const res = await fetch(`${API_BASE}/messages/clear`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Failed to clear messages, status:", res.status);
        return;
      }

      // After successful clear on the server, we also clear locally.
      setMessages([]);
    } catch (err) {
      console.error("Failed to clear messages:", err);
    } finally {
      setClearing(false);
    }
  };

  // -----------------------------
  // Initial load when app mounts
  // -----------------------------
  useEffect(() => {
    // When the component mounts for the first time, load messages once.
    fetchMessages();
    // Dependency array is empty: this runs only once on initial render.
  }, []);

  return (
    <div className="app-root">
      <div className="chat-container">
        {/* Header row with app title + buttons */}
        <div className="chat-header-row">
          <h1 className="chat-title">Simple Chat</h1>

          <div className="chat-header-buttons">
            {/* Refresh button calls fetchMessages again */}
            <button
              className="header-button refresh-button"
              onClick={fetchMessages}
              disabled={loading || clearing}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            {/* Clear button calls clearMessages */}
            <button
              className="header-button clear-button"
              onClick={clearMessages}
              disabled={clearing || loading}
            >
              {clearing ? "Clearing..." : "Clear All"}
            </button>
          </div>
        </div>

        {/* ChatWindow only displays the messages passed from App */}
        <ChatWindow messages={messages} />

        {/* MessageInput sends new messages and then calls onMessageSent,
            which we hook up to fetchMessages to get the updated list. */}
        <MessageInput onMessageSent={fetchMessages} />
      </div>
    </div>
  );
}

export default App;
