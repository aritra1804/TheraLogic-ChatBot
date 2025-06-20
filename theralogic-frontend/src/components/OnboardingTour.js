import React, { useState } from "react";

const stepIcons = [
  "👋", // Welcome
  "💬", // Chat
  "📔", // Journal
  "💾", // Save
  "🚀"  // All set
];

const steps = [
  {
    title: "Welcome to TheraLogic!",
    content: "This is your AI-powered journaling companion. Let's take a quick tour!"
  },
  {
    title: "Chat with AI",
    content: "Go to the Chat page to start a conversation. The AI will remember your previous entries and help you reflect."
  },
  {
    title: "Journal Dashboard",
    content: "On the Journal page, you can view, edit, and search all your past entries."
  },
  {
    title: "Save Your Progress",
    content: "After a chat, click 'Save to Journal' to keep your conversation as a journal entry."
  },
  {
    title: "You're all set!",
    content: "Ready to start your journey? Click Done to begin!"
  }
];

export default function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(() => {
    // Only show if not already completed
    return !localStorage.getItem("theralogic_onboarded");
  });

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setShow(false);
      localStorage.setItem("theralogic_onboarded", "1");
    }
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.35)", zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeInOnboard 0.5s"
    }}>
      <style>{`
        @keyframes fadeInOnboard {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div style={{ background: "var(--bg-card)", borderRadius: 22, padding: 44, maxWidth: 440, minWidth: 320, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", textAlign: "center", zIndex: 10000, fontFamily: "Inter, DM Sans, sans-serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>{stepIcons[step]}</div>
        <h2 style={{ color: "var(--primary)", marginBottom: 18, fontSize: 30, fontWeight: 700 }}>{steps[step].title}</h2>
        <p style={{ fontSize: 21, color: "var(--text-main)", marginBottom: 36, fontWeight: 500 }}>{steps[step].content}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
          {steps.map((_, i) => (
            <span key={i} style={{
              width: 12, height: 12, borderRadius: "50%", display: "inline-block",
              background: i === step ? "var(--primary)" : "#e7eaf6",
              border: i === step ? "2px solid var(--primary-dark)" : "2px solid #e7eaf6",
              transition: "background 0.2s, border 0.2s"
            }} />
          ))}
        </div>
        <button
          onClick={handleNext}
          style={{ background: "var(--primary)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 44px", fontWeight: 700, fontSize: 20, cursor: "pointer", boxShadow: "0 2px 8px rgba(79,140,255,0.08)" }}
        >
          {step === steps.length - 1 ? "Done" : "Next"}
        </button>
      </div>
    </div>
  );
} 