import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        const usuario = await login(email, senha);

        if (!usuario) {
            alert("Email ou senha inválidos.");
            return;
        }

        if (usuario.perfil === "admin") {
            navigate("/admin");
        } else {
            navigate("/");
        }
    };

    return (
        <div className="page-container centralizado">
            <h1>UniBet</h1>

            <form onSubmit={handleLogin}>
                <label>Email</label>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Senha</label>

                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <button type="submit">
                    Entrar
                </button>

                <p className="login-link">
                    Ainda não tem conta?{" "}
                    <Link to="/register">
                        Registrar
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;