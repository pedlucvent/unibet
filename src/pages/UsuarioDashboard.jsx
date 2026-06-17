import { useEffect, useState } from "react";
import { api } from "../services/api";

function UsuarioDashboard() {
    const [usuario, setUsuario] = useState(null);
    const [apostas, setApostas] = useState([]);

    const carregarDados = async () => {
        const usuarioId = 2;

        const usuarioResposta = await api.get(`/usuarios/${usuarioId}`);
        const apostasResposta = await api.get(`/apostas?usuarioId=${usuarioId}`);

        setUsuario(usuarioResposta.data);
        setApostas(apostasResposta.data);
    };

    useEffect(() => {
        carregarDados();
    }, []);

    if (!usuario) {
        return <p>Carregando...</p>;
    }

    const vitorias = apostas.filter((a) => a.status === "ganhou").length;
    const pendentes = apostas.filter((a) => a.status === "pendente").length;
    const derrotas = apostas.filter((a) => a.status === "perdeu").length;

    return (
        <div className="page-container">
            <h1>Dashboard do Usuário</h1>

            <div className="dashboard-hero">
                <div>
                    <h2>Bem-vindo, {usuario.nome}</h2>
                    <p>Acompanhe seu saldo, apostas e desempenho no UniBet.</p>
                </div>

                <div className="saldo-box">
                    <span>Saldo atual</span>
                    <strong>R$ {usuario.saldo}</strong>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <span>Total de apostas</span>
                    <strong>{apostas.length}</strong>
                </div>

                <div className="dashboard-card">
                    <span>Vitórias</span>
                    <strong>{vitorias}</strong>
                </div>

                <div className="dashboard-card">
                    <span>Pendentes</span>
                    <strong>{pendentes}</strong>
                </div>

                <div className="dashboard-card">
                    <span>Derrotas</span>
                    <strong>{derrotas}</strong>
                </div>
            </div>
        </div>
    );
}

export default UsuarioDashboard;