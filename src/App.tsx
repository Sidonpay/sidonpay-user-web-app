import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccount";
import KYCBasicProfile from "./pages/KYCBasicProfile";
import KYCTierOne from "./pages/KYCTierOne";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import HelpCentre from "./pages/HelpCentre";
import HelpCategories from "./pages/HelpCategories";
import HelpCategoryDetail from "./pages/HelpCategoryDetail";
import LiveChat from "./pages/LiveChat";
import ReportProblem from "./pages/ReportProblem";
import SendMail from "./pages/SendMail";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import AccountPage from "./pages/AccountPage";
import ChangeEmailPage from "./pages/ChangeEmailPage";
import SetupPinPage from "./pages/SetupPinPage";
import UsdWalletPage from "./pages/UsdWalletPage";
import NgnWalletPage from "./pages/NgnWalletPage";


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<><Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} /><Landing /></>} /> */}
        <Route path="/" element={<Landing/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/help" element={<HelpPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/kyc/basic-profile" element={<KYCBasicProfile />} />
        <Route path="/kyc/tier-one" element={<KYCTierOne />} />
        <Route path="/dashboard/account" element={<ProtectedRoute isLoggedIn={isLoggedIn}><AccountPage/></ProtectedRoute>}/>
        <Route path="/dashboard/account/change-email" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ChangeEmailPage/></ProtectedRoute>} />
        <Route path="/dashboard/account/setup-pin" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SetupPinPage/></ProtectedRoute>}/>
        <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard /></ProtectedRoute>} />
        <Route path="/usd-wallet" element={<ProtectedRoute isLoggedIn={isLoggedIn}><UsdWalletPage/></ProtectedRoute>} />
        <Route path="/ngn-wallet" element={<ProtectedRoute isLoggedIn={isLoggedIn}><NgnWalletPage/></ProtectedRoute>} />
        <Route path="/transfer" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Transfer /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HelpCentre /></ProtectedRoute>} />
        <Route path="/help/categories" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HelpCategories /></ProtectedRoute>} />
        <Route path="/help/categories/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HelpCategoryDetail /></ProtectedRoute>} />
        <Route path="/help/live-chat" element={<ProtectedRoute isLoggedIn={isLoggedIn}><LiveChat /></ProtectedRoute>} />
        <Route path="/help/report" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ReportProblem /></ProtectedRoute>} />
        <Route path="/help/send-mail" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SendMail /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;