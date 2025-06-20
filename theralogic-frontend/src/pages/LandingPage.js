import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/landing-hero.svg";
import Footer from "../components/Footer";
import TopNav from "../components/TopNav";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f4f6fa 0%, #e7eaf6 100%)",
      display: "flex",
      flexDirection: "column"
    }}>
      <TopNav />
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px 0 16px",
        minHeight: 0
      }}>
        <img src={hero} alt="TheraLogic hero" style={{ maxWidth: 340, width: "90%", marginBottom: 36, borderRadius: 24, boxShadow: "0 2px 16px rgba(79,140,255,0.07)" }} />
        <div className="main-title" style={{ fontSize: 44, fontWeight: 800, marginBottom: 10, color: "#222", letterSpacing: -1 }}>🧠 TheraLogic</div>
        <div style={{ fontSize: 28, fontWeight: 600, color: "#4f8cff", marginBottom: 24 }}>Reflect. Chat. Grow.</div>
        <div className="main-card" style={{ fontSize: 20, color: "#444", marginBottom: 32, textAlign: "center", maxWidth: 900, width: "100%", margin: "0 auto", lineHeight: 1.5, background: "#fff", borderRadius: 20, boxShadow: "0 4px 32px rgba(0,0,0,0.07)", padding: 40 }}>
          TheraLogic is your AI-powered journaling companion.<br />
          Start meaningful conversations, reflect on your day, and build a personal growth journey—one entry at a time.
        </div>
        <ul className="feature-list" style={{ textAlign: "left", margin: "0 auto 36px auto", maxWidth: 400, color: "#333", fontSize: 18, lineHeight: 1.7, listStyle: "none", padding: 0 }}>
          <li style={{ display: "flex", alignItems: "center", gap: 10 }}><span>💬</span> Chat with an empathetic AI</li>
          <li style={{ display: "flex", alignItems: "center", gap: 10 }}><span>📂</span> Keep a private, searchable journal</li>
          <li style={{ display: "flex", alignItems: "center", gap: 10 }}><span>📅</span> Visualize your progress over time</li>
          <li style={{ display: "flex", alignItems: "center", gap: 10 }}><span>🔒</span> 100% private—your data stays on your device</li>
        </ul>
        <button
          onClick={() => navigate("/chat")}
          style={{ background: "#4f8cff", color: "#fff", border: "none", borderRadius: 14, padding: "20px 64px", fontWeight: 800, fontSize: 24, cursor: "pointer", boxShadow: "0 2px 8px rgba(79,140,255,0.08)", marginTop: 8, letterSpacing: 0.5 }}
        >
          Get Started
        </button>
      </main>
      <Footer className="footer" />
    </div>
  );
} 