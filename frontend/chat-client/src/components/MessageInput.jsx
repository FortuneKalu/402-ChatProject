// MessageInput.jsx
// This component handles:
//   - Username input
//   - Message text input
//   - Sending the message to the Flask backend
//   - Informing the parent (App) when a message has been sent successfully

import { useState } from "react";

// Same API base URL as in App.jsx.
// (In a larger project, this could be moved to a shared config file.)
const API_BASE = "http://127.0.0.1:5000";

export default function MessageInput({ onMessageSent }) {
  // username: the name of the person sending messages
  const [username, setUsername] = useState("");

  // text: the main message content
  const [text, setText] = useState("");

  // sending: used to disable the button while the request is in flight
  const [sending, setSending] = useState(false);

  // --------------------------------
  // Send message to Flask backend
  // --------------------------------
  const sendMessage = async () => {
    // Basic guard: prevent empty inputs and double-clicks while sending
    if (!username.trim() || !text.trim() || sending) {
      return;
    }

    try {
      setSending(true);

      // Send a POST request to /messages with JSON body
      const res = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, text }),
      });

      if (!res.ok) {
        console.error("Failed to send message, status:", res.status);
        return;
      }

      // Clear the text input after a successful send
      setText("");

      // If the parent provided a callback, trigger it so App can refresh the list.
      if (typeof onMessageSent === "function") {
        onMessageSent();
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  // Handle pressing Enter in the message input to send the message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="message-input">
      {/* Username input field */}
      <input
        className="input username-input"
        placeholder="Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Message text input field */}
      <input
        className="input message-text-input"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Send button; disabled while sending to prevent spam */}
      <button className="send-button" onClick={sendMessage} disabled={sending}>
        {sending ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
