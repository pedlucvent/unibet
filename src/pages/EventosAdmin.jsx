import { useEffect, useState } from "react";
import { api } from "../services/api";

function EventosAdmin() {
    const [eventos, setEventos] = useState([]);

    const [timeA, setTimeA] = useState("");
    const [timeB, setTimeB] = useState("");
    const [esporte, setEsporte] = useState("");
    const [data, setData] = useState("");

    const carregarEventos = async () => {
        const resposta = await api.get("/eventos");
        setEventos(resposta.data);
    };

    useEffect(() => {
        carregarEventos();
    }, []);

    const cadastrarEvento = async (e) => {
        e.preventDefault();

        if (!timeA || !timeB || !esporte || !data) {
            alert("Preencha todos os campos.");
            return;
        }

        await api.post("/eventos", {
            timeA,
            timeB,
            esporte,
            data,
            status: "aberto",
            resultado: ""
        });

        setTimeA("");
        setTimeB("");
        setEsporte("");
        setData("");

        carregarEventos();

        alert("Evento cadastrado com sucesso!");
    };

    const excluirEvento = async (id) => {
        const confirmar = window.confirm(
            "Deseja realmente excluir este evento? As apostas relacionadas também serão removidas."
        );

        if (!confirmar) {
            return;
        }

        const apostasResposta = await api.get(`/apostas?eventoId=${id}`);

        for (const aposta of apostasResposta.data) {
            await api.delete(`/apostas/${aposta.id}`);
        }

        await api.delete(`/eventos/${id}`);

        carregarEventos();

        alert("Evento excluído com sucesso!");
    };

    const encerrarEvento = async (id) => {
        await api.patch(`/eventos/${id}`, {
            status: "encerrado"
        });

        carregarEventos();
    };

    const definirResultado = async (evento, resultado) => {
        await api.patch(`/eventos/${evento.id}`, {
            resultado,
            status: "finalizado"
        });

        const apostas = await api.get(
            `/apostas?eventoId=${evento.id}&status=pendente`
        );

        for (const aposta of apostas.data) {
            if (aposta.palpite === resultado) {
                const retorno = aposta.valor * 2;

                await api.patch(`/apostas/${aposta.id}`, {
                    status: "ganhou",
                    retorno
                });

                const usuario = await api.get(
                    `/usuarios/${aposta.usuarioId}`
                );

                await api.patch(`/usuarios/${aposta.usuarioId}`, {
                    saldo: usuario.data.saldo + retorno
                });
            } else {
                await api.patch(`/apostas/${aposta.id}`, {
                    status: "perdeu",
                    retorno: 0
                });
            }
        }

        carregarEventos();

        alert("Resultado registrado!");
    };

    const corStatus = (status) => {
        if (status === "aberto") return "#22c55e";
        if (status === "encerrado") return "#f59e0b";
        return "#ef4444";
    };

    return (
        <div className="page-container">
            <h1>Painel do Administrador</h1>

            <div className="admin-card">
                <h2>Cadastrar Evento</h2>

                <form onSubmit={cadastrarEvento}>
                    <input
                        type="text"
                        placeholder="Time A"
                        value={timeA}
                        onChange={(e) => setTimeA(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Time B"
                        value={timeB}
                        onChange={(e) => setTimeB(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Esporte"
                        value={esporte}
                        onChange={(e) => setEsporte(e.target.value)}
                    />

                    <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />

                    <button type="submit">
                        Cadastrar Evento
                    </button>
                </form>
            </div>

            {eventos.length === 0 ? (
                <div className="card">
                    <p>Nenhum evento cadastrado.</p>
                </div>
            ) : (
                eventos.map((evento) => (
                    <div className="admin-card" key={evento.id}>
                        <div className="admin-card-header">
                            <div>
                                <h3>
                                    {evento.timeA} x {evento.timeB}
                                </h3>

                                <p>
                                    <strong>Esporte:</strong>{" "}
                                    {evento.esporte}
                                </p>

                                <p>
                                    <strong>🏆 Vencedor:</strong>{" "}
                                    {evento.resultado || "Não definido"}
                                </p>

                                <p>
                                    <strong>Data:</strong>{" "}
                                    {evento.data}
                                </p>
                            </div>

                            <div className="admin-status-box">
                                <span>Status atual</span>

                                <strong
                                    style={{
                                        color: corStatus(evento.status)
                                    }}
                                >
                                    {evento.status.toUpperCase()}
                                </strong>
                            </div>
                        </div>

                        <div className="admin-actions">
                            {evento.status === "aberto" && (
                                <button
                                    className="btn-alerta"
                                    onClick={() =>
                                        encerrarEvento(evento.id)
                                    }
                                >
                                    Encerrar Apostas
                                </button>
                            )}

                            {evento.status !== "finalizado" && (
                                <>
                                    <button
                                        onClick={() =>
                                            definirResultado(
                                                evento,
                                                evento.timeA
                                            )
                                        }
                                    >
                                        Vitória {evento.timeA}
                                    </button>

                                    <button
                                        onClick={() =>
                                            definirResultado(
                                                evento,
                                                evento.timeB
                                            )
                                        }
                                    >
                                        Vitória {evento.timeB}
                                    </button>
                                </>
                            )}

                            <button
                                className="btn-excluir"
                                onClick={() =>
                                    excluirEvento(evento.id)
                                }
                            >
                                Excluir Evento
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default EventosAdmin;