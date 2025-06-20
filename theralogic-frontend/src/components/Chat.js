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
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0 8px 0", background: "#fafbfc", borderRadius: 16, marginBottom: 12 }}>
        {history.length === 0 && (
          <div style={{ color: "#888", textAlign: "center", margin: "32px 0", fontSize: 18 }}>
            👋 Welcome! How can I help you today?
          </div>
        )}
        {history.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: 14,
              flexDirection: msg.role === "user" ? "row-reverse" : "row"
            }}
          >
            <img
              src={msg.role === "user" ? userAvatar : botAvatar}
              alt={msg.role}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                margin: msg.role === "user" ? "0 0 0 12px" : "0 12px 0 0",
                background: "#e7eaf6",
                objectFit: "cover",
                boxShadow: "0 2px 8px rgba(79,140,255,0.07)"
              }}
            />
            <div style={{
              background: msg.role === "user" ? "#d1e7dd" : "#e7eaf6",
              color: "#222",
              padding: "14px 18px",
              borderRadius: 18,
              maxWidth: "70%",
              fontSize: 17,
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              position: "relative"
            }}>
              <span>{msg.content}</span>
              <div style={{ fontSize: 13, color: "#888", marginTop: 6, textAlign: msg.role === "user" ? "right" : "left" }}>
                {msg.role === "user" ? "You" : "TheraLogic"} • {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 14 }}>
            <img src={botAvatar} alt="bot" style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 12, background: "#e7eaf6", objectFit: "cover", boxShadow: "0 2px 8px rgba(79,140,255,0.07)" }} />
            <div style={{ background: "#e7eaf6", color: "#222", padding: "14px 18px", borderRadius: 18, maxWidth: "70%", fontSize: 17, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", position: "relative" }}>
              <span className="typing">Assistant is typing…</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form style={{ display: "flex", gap: 10, padding: 0, borderTop: "1px solid #eee", background: "#fafbfc", borderRadius: 12 }} onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message…"
          disabled={loading}
          style={{
            flex: 1,
            padding: "16px 18px",
            borderRadius: 10,
            border: "1px solid #ccc",
            fontSize: 17,
            margin: 8,
            outline: "none",
            fontFamily: "inherit"
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: "0 32px",
            borderRadius: 10,
            border: "none",
            background: loading || !input.trim() ? "#b3c7f7" : "#4f8cff",
            color: "#fff",
            fontWeight: 700,
            fontSize: 18,
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            margin: 8,
            boxShadow: "0 2px 8px rgba(79,140,255,0.08)",
            transition: "background 0.2s"
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
} 