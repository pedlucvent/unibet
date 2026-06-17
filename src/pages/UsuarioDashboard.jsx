import { useEffect, useState } from "react";
import { api } from "../services/api";

function UsuarioDashboard() {
    const [usuario, setUsuario] = useState(null);
    const [apostas, setApostas] = useState([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        const usuarioId = 2; // usuário de teste

        const usuarioResposta = await api.get(
            `/usuarios/${usuarioId}`
        );

        const apostasResposta = await api.get(
            `/apostas?usuarioId=${usuarioId}`
        );

        setUsuario(usuarioResposta.data);
        setApostas(apostasResposta.data);
    };

    if (!usuario) {
        return <p>Carregando...</p>;
    }

    const vitorias = apostas.filter(
        (a) => a.status === "ganhou"
    ).length;

    return (
        <div>
            <h1>Dashboard do Usuário</h1>

            <h2>Bem-vindo, {usuario.nome}</h2>

            <p>Saldo: R$ {usuario.saldo}</p>

            <p>Total de apostas: {apostas.length}</p>

            <p>Vitórias: {vitorias}</p>
        </div>
    );
}

export default UsuarioDashboard;
