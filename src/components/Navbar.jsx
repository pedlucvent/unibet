import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    const sair = () => {
        logout();
        navigate("/login");
    };

    if (!usuario) {
        return null;
    }

    return (
        <nav>
            <h2>UniBet</h2>

            {usuario.perfil === "usuario" && (
                <>
                    <Link to="/">Dashboard</Link> |{" "}
                    <Link to="/eventos">Eventos</Link> |{" "}
                    <Link to="/apostar">Apostar</Link> |{" "}
                    <Link to="/historico">Histórico</Link> |{" "}
                    <Link to="/ranking">Ranking</Link>
                </>
            )}

            {usuario.perfil === "admin" && (
                <>
                    <Link to="/admin">Painel Admin</Link> |{" "}
                    <Link to="/ranking">Ranking</Link>
                </>
            )}

            <button onClick={sair} style={{ marginLeft: 15 }}>
                Sair
            </button>
        </nav>
    );
}

export default Navbar;