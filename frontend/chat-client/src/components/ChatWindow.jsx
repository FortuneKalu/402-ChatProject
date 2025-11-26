// ChatWindow.jsx
// This component is purely presentational.
// It receives an array of messages as a prop from App
// and renders them in a scrollable message area.

export default function ChatWindow({ messages }) {
  // If messages is undefined or null, default to an empty array.
  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <div className="chat-window">
      {/* If there are no messages, show a friendly "empty" message */}
      {safeMessages.length === 0 && (
        <p className="chat-empty">No messages yet. Start the conversation!</p>
      )}

      {/* Render each message as a simple "bubble" */}
      {safeMessages.map((m, i) => (
        <div className="chat-message" key={i}>
          {/* Username line (bold + colored) */}
          <span className="chat-message-username">{m.username || "Anon"}</span>

          {/* Actual text content of the message */}
          <span className="chat-message-text">{m.text}</span>
        </div>
      ))}
    </div>
  );
}
