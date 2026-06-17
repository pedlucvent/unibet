import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";

function Register() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const cadastrarUsuario = async (e) => {
        e.preventDefault();

        if (!nome || !email || !senha) {
            alert("Preencha todos os campos.");
            return;
        }

        const resposta = await api.get(`/usuarios?email=${email}`);

        if (resposta.data.length > 0) {
            alert("Este email já está cadastrado.");
            return;
        }

        await api.post("/usuarios", {
            nome,
            email,
            senha,
            perfil: "usuario",
            saldo: 1000
        });

        alert("Usuário cadastrado com sucesso!");
        navigate("/login");
    };

    return (
        <div className="page-container centralizado">
            <h1>Criar Conta</h1>

            <form onSubmit={cadastrarUsuario}>
                <label>Nome:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <br /><br />

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br /><br />

                <label>Senha:</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">
                    Cadastrar
                </button>

                <p className="login-link">
                    Já tem conta? <Link to="/login">Entrar</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;