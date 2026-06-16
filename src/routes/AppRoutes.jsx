import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import UsuarioDashboard from "../pages/UsuarioDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Eventos from "../pages/Eventos";
import Apostar from "../pages/Apostar";
import Historico from "../pages/Historico";
import Ranking from "../pages/Ranking";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* pública */}
      <Route path="/login" element={<Login />} />

      {/* protegidas usuário */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <UsuarioDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/eventos"
        element={
          <ProtectedRoute>
            <Eventos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/apostar"
        element={
          <ProtectedRoute>
            <Apostar />
          </ProtectedRoute>
        }
      />

      <Route
        path="/historico"
        element={
          <ProtectedRoute>
            <Historico />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ranking"
        element={
          <ProtectedRoute>
            <Ranking />
          </ProtectedRoute>
        }
      />

      {/* admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}