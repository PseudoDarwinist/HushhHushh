import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, Users, Zap, Upload, Target, Timer, Play } from "lucide-react";

// Components
import LandingPage from "./components";
import WhispererOnboarding from "./components";
import VaultCreation from "./components";

function App() {
  const [currentView, setCurrentView] = useState('landing'); // landing, onboarding, vault-creation
  const [user, setUser] = useState(null);
  const [vaults, setVaults] = useState([
    {
      id: 1,
      title: "Bollywood Star's On-Set Meltdown",
      category: "Unhinged",
      goal: 50000,
      pledged: 12000,
      timeLeft: "11 days",
      backers: 24,
      preview: "A major Bollywood actor threw a chair during filming...",
      image: "https://images.pexels.com/photos/3156660/pexels-photo-3156660.jpeg"
    },
    {
      id: 2,
      title: "CEO's Midnight Crisis Call",
      category: "Unhinged", 
      goal: 25000,
      pledged: 8500,
      timeLeft: "6 days",
      backers: 15,
      preview: "What happens when a startup CEO discovers their biggest client...",
      image: "https://images.pexels.com/photos/8404994/pexels-photo-8404994.jpeg"
    }
  ]);

  const handleNavigation = (view, data = null) => {
    setCurrentView(view);
    if (data) {
      if (data.user) setUser(data.user);
      if (data.vault) setVaults([...vaults, data.vault]);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
              <AnimatePresence mode="wait">
                {currentView === 'landing' && (
                  <LandingPage 
                    key="landing"
                    onNavigate={handleNavigation}
                    vaults={vaults}
                  />
                )}
                {currentView === 'onboarding' && (
                  <WhispererOnboarding 
                    key="onboarding"
                    onNavigate={handleNavigation}
                    onComplete={(user) => handleNavigation('vault-creation', { user })}
                  />
                )}
                {currentView === 'vault-creation' && (
                  <VaultCreation 
                    key="vault-creation"
                    onNavigate={handleNavigation}
                    user={user}
                    onVaultCreated={(vault) => handleNavigation('landing', { vault })}
                  />
                )}
              </AnimatePresence>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;