import React from "react";

export default function JournalList({ entries, onSelect, onDelete }) {
  if (!entries.length) {
    return <div style={{ color: "#888", margin: "32px 0", textAlign: "center" }}>No journal entries yet.</div>;
  }
  return (
    <div style={{ marginBottom: 24 }}>
      {entries.map(entry => (
        <div key={entry.id} style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          padding: 16,
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ cursor: "pointer" }} onClick={() => onSelect(entry)}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>{entry.title || "Untitled"}</div>
            <div style={{ color: "#888", fontSize: 14 }}>{entry.date}</div>
            {entry.tags && entry.tags.length > 0 && (
              <div style={{ marginTop: 4 }}>
                {entry.tags.map(tag => (
                  <span key={tag} style={{ background: "#e7eaf6", color: "#4f8cff", borderRadius: 6, padding: "2px 8px", fontSize: 12, marginRight: 6 }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => onDelete(entry.id)} style={{ background: "#ff4f4f", color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Delete</button>
        </div>
      ))}
    </div>
  );
} 