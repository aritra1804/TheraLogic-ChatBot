import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import JournalPage from "./pages/JournalPage";
import "./Chat.css";

function App() {
  return (
    <Router>
      <nav style={{
        display: "flex", justifyContent: "center", gap: 32, padding: 16, background: "#f4f6fa", boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
      }}>
        <Link to="/chat" style={{ textDecoration: "none", color: "#4f8cff", fontWeight: 600 }}>Chat</Link>
        <Link to="/journal" style={{ textDecoration: "none", color: "#4f8cff", fontWeight: 600 }}>Journal</Link>
      </nav>
      <Routes>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
