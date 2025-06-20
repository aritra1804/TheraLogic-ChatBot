import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import { STORAGE_KEY, loadEntries } from "./JournalPage";

function getYesterdayDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export default function ChatPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yesterdayEntry, setYesterdayEntry] = useState(null);
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    // Load yesterday's journal entry
    const entries = loadEntries();
    const yest = getYesterdayDate();
    const entry = entries.find(e => e.date === yest);
    if (entry) {
      setYesterdayEntry(entry);
      setHistory([
        {
          role: "assistant",
          content: `Yesterday you wrote: "${entry.content}". How are you feeling today?`
        }
      ]);
    }
  }, []);

  const sendMessage = async (input) => {
    const newHistory = [...history, { role: "user", content: input }];
    setHistory(newHistory);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5050/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: history,
        }),
      });
      const data = await response.json();
      setHistory([...newHistory, { role: "assistant", content: data.response }]);
      setShowSave(true);
    } catch (err) {
      setHistory([
        ...newHistory,
        { role: "assistant", content: "Error: Could not reach backend." },
      ]);
    }
    setLoading(false);
  };

  const handleSaveToJournal = () => {
    const today = new Date().toISOString().slice(0, 10);
    const content = history
      .filter(m => m.role === "user" || m.role === "assistant")
      .map(m => `${m.role === "user" ? "You" : "Assistant"}: ${m.content}`)
      .join("\n");
    const entry = {
      title: `Chat on ${today}`,
      content,
      date: today,
      tags: ["chat"],
      id: Date.now(),
    };
    const entries = loadEntries();
    const updated = [entry, ...entries];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setShowSave(false);
    alert("Chat saved to journal!");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: 24 }}>🧠 TheraLogic Chatbot</h2>
      <Chat onSend={sendMessage} history={history} loading={loading} />
      {showSave && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button onClick={handleSaveToJournal} style={{ background: "#4f8cff", color: "#fff", border: "none", borderRadius: 8, padding: "8px 24px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
            Save to Journal
          </button>
        </div>
      )}
    </div>
  );
} 