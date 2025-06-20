import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import JournalPage from "./pages/JournalPage";
import LandingPage from "./pages/LandingPage";
import OnboardingTour from "./components/OnboardingTour";
import "./Chat.css";

function App() {
  return (
    <Router>
      <OnboardingTour />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/journal" element={<JournalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
