import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import RedirectRoutes from "@/routes/RedirectRoutes";
import DashboardLayout from "@/layouts";
import Dashboard from "@/pages/dashboard";
import GoogleAuthProvider from "./providers/google-provider";

function App() {
  return (
    <GoogleAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route element={<RedirectRoutes />}>
            <Route index path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="integrations" element={<Dashboard />} />
              <Route path="settings" element={<Dashboard />} />
              <Route path="help" element={<Dashboard />} />
              <Route path="analytics" element={<Dashboard />} />
              <Route path="chats" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleAuthProvider>
  );
}

export default App;
