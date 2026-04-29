import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccount";
import KYCBasicProfile from "./pages/KYCBasicProfile";
import KYCTierOne from "./pages/KYCTierOne";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";


const App: React.FC = () => {
  // Simple auth simulation (placeholder until real auth is wired up)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

           return (
           <Router>
           <Routes>
           <Route path="/" element={<><Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /><Landing /></>} />
           <Route path="/login" element={<Login onLogin={handleLogin} />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/verify-account" element={<VerifyAccount />} />
           <Route path="/kyc/basic-profile" element={<KYCBasicProfile />} />
           <Route path="/kyc/tier-one" element={<KYCTierOne />} />
           <Route
            path="/dashboard"
             element={
             <ProtectedRoute isLoggedIn={isLoggedIn}>
             <><Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /><Dashboard /></>
          </ProtectedRoute>
         }
        />
         <Route path="*" element={<NotFound />} />
        </Routes>
        </Router>
);
      };

export default App;
