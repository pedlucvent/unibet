import { useEffect, useState } from "react";
import { api } from "../services/api";

function EventosAdmin() {
    const [eventos, setEventos] = useState([]);

    const carregarEventos = async () => {
        const resposta = await api.get("/eventos");
        setEventos(resposta.data);
    };

    useEffect(() => {
        carregarEventos();
    }, []);

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

                const usuario = await api.get(`/usuarios/${aposta.usuarioId}`);

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

            {eventos.length === 0 ? (
                <div className="card">
                    <p>Nenhum evento cadastrado.</p>
                </div>
            ) : (
                eventos.map((evento) => (
                    <div className="admin-card" key={evento.id}>
                        <div className="admin-card-header">
                            <div>
                                <h3>{evento.timeA} x {evento.timeB}</h3>

                                <p>
                                    <strong>Esporte:</strong> {evento.esporte}
                                </p>

                                <p>
                                    <strong>🏆 Vencedor:</strong>{" "}
                                    {evento.resultado || "Não definido"}
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
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default EventosAdmin;