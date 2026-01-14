import type { JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";
import { useAppSelector } from "./store/hooks";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public page */}
        <Route path="/login" element={<Login />} />

        {/* Protected pages with navbar */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add more protected pages here */}
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/page-not-found" replace />} />
      </Routes>
    </Router>
  );
}

