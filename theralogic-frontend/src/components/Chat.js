import React, { useState, useRef, useEffect } from "react";
import "../Chat.css";
import userAvatar from "../assets/user.png";
import botAvatar from "../assets/bot.png";

export default function Chat({ onSend, history, loading }) {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {history.length === 0 && (
          <div className="chat-welcome">
            👋 Welcome! How can I help you today?
          </div>
        )}
        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            <img
              src={msg.role === "user" ? userAvatar : botAvatar}
              alt={msg.role}
              className="chat-avatar"
            />
            <div className="chat-bubble">
              <span>{msg.content}</span>
              <div className="chat-meta">
                {msg.role === "user" ? "You" : "TheraLogic"} • {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-message bot">
            <img src={botAvatar} alt="bot" className="chat-avatar" />
            <div className="chat-bubble typing">Assistant is typing…</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form className="chat-input-row" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
} 