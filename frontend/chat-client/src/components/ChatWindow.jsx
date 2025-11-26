export default function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {(!messages || messages.length === 0) && (
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
