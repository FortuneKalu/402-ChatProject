import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  return (
    <div className="app-root">
      <div className="chat-container">
        <h1 className="chat-title">Simple Chat App</h1>
        <ChatWindow />
        <MessageInput />
      </div>
    </div>
  );
}

export default App;
