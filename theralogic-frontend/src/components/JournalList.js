import React from "react";

export default function JournalList({ entries, onSelect, onDelete }) {
  if (!entries.length) {
    return <div style={{ color: "#888", margin: "32px 0", textAlign: "center", fontSize: 18 }}>No journal entries yet.</div>;
  }
  return (
    <div style={{ marginBottom: 24 }}>
      {entries.map(entry => (
        <div key={entry.id} style={{
          background: "#f8faff",
          borderRadius: 14,
          boxShadow: "0 2px 12px rgba(79,140,255,0.06)",
          padding: 18,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "box-shadow 0.2s",
          cursor: "pointer"
        }}>
          <div onClick={() => onSelect(entry)} style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4, color: "#222" }}>{entry.title || "Untitled"}</div>
            <div style={{ color: "#4f8cff", fontSize: 15, marginBottom: 6 }}>{entry.date}</div>
            {entry.tags && entry.tags.length > 0 && (
              <div style={{ marginTop: 2, marginBottom: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                {entry.tags.map(tag => (
                  <span key={tag} style={{ background: "#e7eaf6", color: "#4f8cff", borderRadius: 8, padding: "2px 10px", fontSize: 13, fontWeight: 600 }}>{tag}</span>
                ))}
              </div>
            )}
            <div style={{ color: "#888", fontSize: 16, marginTop: 2, maxWidth: 340, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {entry.content?.slice(0, 80) || "(No content)"}
              {entry.content && entry.content.length > 80 ? "…" : ""}
            </div>
          </div>
          <button onClick={() => onDelete(entry.id)} style={{ background: "#fff", color: "#ff4f4f", border: "1px solid #ff4f4f", borderRadius: 8, padding: "6px 18px", fontWeight: 700, fontSize: 15, cursor: "pointer", marginLeft: 18, transition: "background 0.2s, color 0.2s" }}>Delete</button>
        </div>
      ))}
    </div>
  );
} 