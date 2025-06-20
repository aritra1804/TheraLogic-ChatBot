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
    console.log("Entry to save from form:", entryToSave);
    onSave(entryToSave);
  };

  return (
    <form onSubmit={handleSave} style={{ background: "#f9f9f9", padding: 20, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.04)", marginBottom: 24 }}>
      <div style={{ marginBottom: 12 }}>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          style={{ width: "100%", padding: 8, fontSize: 18, borderRadius: 6, border: "1px solid #ccc" }}
          required
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your journal entry..."
          rows={6}
          style={{ width: "100%", padding: 8, fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
          required
        />
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
          required
        />
        <input
          type="text"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" style={{ background: "#4f8cff", color: "#fff", border: "none", borderRadius: 8, padding: "8px 24px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>Save</button>
        {onCancel && <button type="button" onClick={onCancel} style={{ background: "#eee", color: "#333", border: "none", borderRadius: 8, padding: "8px 24px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>Cancel</button>}
      </div>
    </form>
  );
} 