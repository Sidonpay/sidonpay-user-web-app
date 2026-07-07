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
import AddMoneyPage from "./pages/AddMoneyPage";
import ManageCardsPage from "./pages/ManageCardsPage";
import AddCardPage from "./pages/AddCardPage";
import CardFundingPage from "./pages/CardFundingPage";
import CardReceiptPage from "./pages/CardReceiptPage";
import { WalletProvider } from "./context/WalletContext";
import BankTransferPage from "./pages/BankTransferPage";
import UssdPaymentPage from "./pages/UssdPaymentPage";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <WalletProvider>
      <Routes>
        {/* Public marketing pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/kyc/basic-profile" element={<KYCBasicProfile />} />
        <Route path="/kyc/tier-one" element={<KYCTierOne />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/account" element={<ProtectedRoute isLoggedIn={isLoggedIn}><AccountPage /></ProtectedRoute>} />
        <Route path="/dashboard/account/change-email" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ChangeEmailPage /></ProtectedRoute>} />
        <Route path="/dashboard/account/setup-pin" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SetupPinPage /></ProtectedRoute>} />
        <Route path="/transfer" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Transfer /></ProtectedRoute>} />

        {/* Wallets */}
        <Route path="/ngn-wallet" element={<ProtectedRoute isLoggedIn={isLoggedIn}><NgnWalletPage /></ProtectedRoute>} />
        <Route path="/usd-wallet" element={<ProtectedRoute isLoggedIn={isLoggedIn}><UsdWalletPage /></ProtectedRoute>} />

        {/* Add Money — NGN only for now */}
        <Route path="/add-money" element={<ProtectedRoute isLoggedIn={isLoggedIn}><AddMoneyPage /></ProtectedRoute>} />
        <Route path="/card-funding" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CardFundingPage /></ProtectedRoute>} />
        <Route path="/card-receipt" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CardReceiptPage /></ProtectedRoute>} />
        <Route path="/bank-transfer" element={<ProtectedRoute isLoggedIn={isLoggedIn}><BankTransferPage/></ProtectedRoute>} />
        <Route path="/add-money/ussd" element={<ProtectedRoute isLoggedIn={isLoggedIn}><UssdPaymentPage/></ProtectedRoute>} />

        {/* Card Management */}
        <Route path="/manage-cards" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ManageCardsPage /></ProtectedRoute>} />
        <Route path="/add-card" element={<ProtectedRoute isLoggedIn={isLoggedIn}><AddCardPage /></ProtectedRoute>} />

        {/* Dashboard Help */}
        <Route path="/dashboard/help" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HelpCentre /></ProtectedRoute>} />
        <Route path="/dashboard/help/categories" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HelpCategories /></ProtectedRoute>} />
        <Route path="/dashboard/help/categories/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HelpCategoryDetail /></ProtectedRoute>} />
        <Route path="/dashboard/help/live-chat" element={<ProtectedRoute isLoggedIn={isLoggedIn}><LiveChat /></ProtectedRoute>} />
        <Route path="/dashboard/help/report" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ReportProblem /></ProtectedRoute>} />
        <Route path="/dashboard/help/send-mail" element={<ProtectedRoute isLoggedIn={isLoggedIn}><SendMail /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </WalletProvider>
    </Router>
  );
};

export default App;