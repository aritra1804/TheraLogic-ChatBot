import React, { useState, useEffect } from "react";
import JournalList from "../components/JournalList";
import JournalEntry from "../components/JournalEntry";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const STORAGE_KEY = "theralogic_journal_entries";

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export { STORAGE_KEY, loadEntries };

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const handleSave = (entry) => {
    console.log("Entry received in handleSave:", entry);
    let exists = entries.some(e => e.id === entry.id);
    let updated;
    if (exists) {
      updated = entries.map(e => (e.id === entry.id ? entry : e));
    } else {
      updated = [entry, ...entries];
    }
    console.log("Saving entries:", updated);
    setEntries(updated);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEditing(null);
  };

  const handleDelete = (id) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
    if (editing && editing.id === id) setEditing(null);
  };

  const handleSelect = (entry) => {
    setEditing(entry);
  };

  const handleNew = () => {
    setEditing({
      title: "",
      content: "",
      date: new Date().toISOString().slice(0, 10),
      tags: "",
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f4f6fa 0%, #e7eaf6 100%)", display: "flex", flexDirection: "column" }}>
      <TopNav />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0 }}>
        <div className="journal-card" style={{
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
          <h2 style={{ textAlign: "center", marginTop: 0, marginBottom: 24, fontWeight: 700, fontSize: 28, color: "#4f8cff", letterSpacing: -1 }}>📔 My Journal</h2>
          <button onClick={handleNew} style={{ background: "#4f8cff", color: "#fff", border: "none", borderRadius: 8, padding: "10px 32px", fontWeight: 700, fontSize: 18, marginBottom: 24, cursor: "pointer", boxShadow: "0 2px 8px rgba(79,140,255,0.08)" }}>New Entry</button>
          {editing !== null ? (
            <JournalEntry entry={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
          ) : null}
          <JournalList entries={entries} onSelect={handleSelect} onDelete={handleDelete} />
        </div>
      </main>
      <Footer className="footer" />
    </div>
  );
} 