import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({
    children,
    adminOnly = false
}) {
    const { usuario } = useAuth();

    if (!usuario) {
        return <Navigate to="/login" />;
    }

    if (
        adminOnly &&
        usuario.perfil !== "admin"
    ) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;