import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import SignupPage from "./pages/auth/SignupPage";

import Navbar from "./components/Navbar";

import UserDashboard from "./pages/admin/users/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import UsersList from "./pages/admin/users/UsersList";
import UserForm from "./pages/admin/users/UserForm";
import UserDetails from "./pages/admin/users/UserDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <UsersList />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/users/create" element={<UserForm />} />
          <Route path="/admin/users/edit/:id" element={<UserForm />} />
          <Route path="/admin/users/:id" element={<UserDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
