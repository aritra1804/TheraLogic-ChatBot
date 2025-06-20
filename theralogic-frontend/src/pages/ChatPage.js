import React from "react";
import Chat from "../components/Chat";
import { STORAGE_KEY, loadEntries } from "./JournalPage";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

function getYesterdayDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export default function ChatPage() {
  const [history, setHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [yesterdayEntry, setYesterdayEntry] = React.useState(null);
  const [showSave, setShowSave] = React.useState(false);

  React.useEffect(() => {
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
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f4f6fa 0%, #e7eaf6 100%)", display: "flex", flexDirection: "column" }}>
      <TopNav />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0 }}>
        <div className="chat-card" style={{
          maxWidth: 900,
          width: "100%",
          margin: "56px auto 0 auto",
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
          padding: 40,
          minHeight: 540,
          display: "flex",
          flexDirection: "column"
        }}>
          <h2 style={{ textAlign: "center", marginTop: 0, marginBottom: 24, fontWeight: 700, fontSize: 28, color: "#4f8cff", letterSpacing: -1 }}>🧠 TheraLogic Chatbot</h2>
          <Chat onSend={sendMessage} history={history} loading={loading} />
          {showSave && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button onClick={handleSaveToJournal} style={{ background: "#4f8cff", color: "#fff", border: "none", borderRadius: 8, padding: "10px 32px", fontWeight: 700, fontSize: 18, cursor: "pointer", boxShadow: "0 2px 8px rgba(79,140,255,0.08)" }}>
                Save to Journal
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer className="footer" />
    </div>
  );
} 