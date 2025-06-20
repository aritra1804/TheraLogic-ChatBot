import React, { useState, useEffect } from "react";
import JournalList from "../components/JournalList";
import JournalEntry from "../components/JournalEntry";

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
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
      <h2>📔 My Journal</h2>
      <button onClick={handleNew} style={{ background: "#4f8cff", color: "#fff", border: "none", borderRadius: 8, padding: "8px 24px", fontWeight: 600, fontSize: 16, marginBottom: 24, cursor: "pointer" }}>New Entry</button>
      {editing !== null ? (
        <JournalEntry entry={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
      ) : null}
      <JournalList entries={entries} onSelect={handleSelect} onDelete={handleDelete} />
    </div>
  );
} 