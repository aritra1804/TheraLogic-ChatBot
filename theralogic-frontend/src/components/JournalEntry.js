import React, { useState } from "react";

export default function JournalEntry({ entry, onSave, onCancel }) {
  const [title, setTitle] = useState(entry?.title || "");
  const [content, setContent] = useState(entry?.content || "");
  const [date, setDate] = useState(entry?.date || new Date().toISOString().slice(0, 10));
  const [tags, setTags] = useState(
    Array.isArray(entry?.tags) ? entry.tags.join(", ") : (entry?.tags || "")
  );

  const handleSave = (e) => {
    e.preventDefault();
    const entryToSave = {
      ...entry,
      title,
      content,
      date,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      id: entry?.id || Date.now(),
    };
    onSave(entryToSave);
  };

  return (
    <form onSubmit={handleSave} style={{
      background: "#f8faff",
      padding: 28,
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(79,140,255,0.06)",
      marginBottom: 28,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        style={{
          width: "100%",
          padding: 14,
          fontSize: 20,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontWeight: 600,
          marginBottom: 2
        }}
        required
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your journal entry..."
        rows={7}
        style={{
          width: "100%",
          padding: 14,
          fontSize: 17,
          borderRadius: 8,
          border: "1px solid #ccc",
          fontFamily: "inherit",
          marginBottom: 2
        }}
        required
      />
      <div style={{ display: "flex", gap: 12, marginBottom: 2 }}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 }}
          required
        />
        <input
          type="text"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #ccc", fontSize: 16 }}
        />
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        <button type="submit" style={{ background: "#4f8cff", color: "#fff", border: "none", borderRadius: 10, padding: "12px 36px", fontWeight: 700, fontSize: 18, cursor: "pointer", boxShadow: "0 2px 8px rgba(79,140,255,0.08)" }}>Save</button>
        {onCancel && <button type="button" onClick={onCancel} style={{ background: "#eee", color: "#333", border: "none", borderRadius: 10, padding: "12px 36px", fontWeight: 700, fontSize: 18, cursor: "pointer" }}>Cancel</button>}
      </div>
    </form>
  );
} 