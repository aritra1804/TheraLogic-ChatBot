import React from "react";
import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <header style={{ width: "100%", background: "rgba(255,255,255,0.95)", boxShadow: "0 2px 12px rgba(79,140,255,0.04)", position: "sticky", top: 0, zIndex: 100 }}>
      <nav style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 40px 18px 32px",
        flexWrap: "wrap",
        rowGap: 8
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 26, color: "#4f8cff", minWidth: 120 }}>
          <span role="img" aria-label="brain">🧠</span> TheraLogic
        </div>
        <div style={{ display: "flex", gap: 32, fontWeight: 600, fontSize: 18, flexWrap: "wrap" }}>
          <Link to="/" style={{ color: "#4f8cff", textDecoration: "none", padding: "6px 0" }}>Home</Link>
          <Link to="/chat" style={{ color: "#4f8cff", textDecoration: "none", padding: "6px 0" }}>Chat</Link>
          <Link to="/journal" style={{ color: "#4f8cff", textDecoration: "none", padding: "6px 0" }}>Journal</Link>
        </div>
      </nav>
    </header>
  );
} 