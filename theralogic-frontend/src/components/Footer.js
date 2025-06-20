import React from "react";

export default function Footer() {
  return (
    <footer className="footer" style={{
      width: "100%",
      marginTop: 48,
      color: "#888",
      fontSize: 16,
      textAlign: "center",
      padding: 24,
      borderTop: "1px solid #e7eaf6",
      background: "rgba(255,255,255,0.92)",
      fontFamily: "Inter, DM Sans, sans-serif"
    }}>
      Made with <span style={{ color: "#ff4f4f" }}>❤️</span> by Aritra Dutta for your mental wellness
    </footer>
  );
} 