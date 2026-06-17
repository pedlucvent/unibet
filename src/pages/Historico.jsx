import { useEffect, useState } from "react";
import { api } from "../services/api";

function Historico() {
    const [apostas, setApostas] = useState([]);
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const apostasResposta = await api.get("/apostas");
            const eventosResposta = await api.get("/eventos");

            setApostas(apostasResposta.data);
            setEventos(eventosResposta.data);
        } catch (erro) {
            console.error(erro);
        }
    };

    const corStatus = (status) => {
        if (status === "ganhou") return "#22c55e";
        if (status === "perdeu") return "#ef4444";
        return "#f59e0b";
    };

    const buscarEvento = (eventoId) => {
        return eventos.find(
            (evento) => evento.id === apostaIdParaNumero(eventoId)
        );
    };

    const apostaIdParaNumero = (id) => {
        return Number(id);
    };

    return (
        <div className="page-container">
            <h1>Histórico de Apostas</h1>

            {apostas.length === 0 ? (
                <div className="card">
                    <p>Nenhuma aposta encontrada.</p>
                </div>
            ) : (
                apostas.map((aposta) => {
                    const evento = buscarEvento(aposta.eventoId);

                    return (
                        <div className="card" key={aposta.id}>
                            <h3>Aposta #{aposta.id}</h3>

                            {evento && (
                                <>
                                    <p>
                                        <strong>Evento:</strong>{" "}
                                        {evento.timeA} vs {evento.timeB}
                                    </p>

                                    <p>
                                        <strong>Esporte:</strong>{" "}
                                        {evento.esporte}
                                    </p>
                                </>
                            )}

                            <p>
                                <strong>Palpite:</strong>{" "}
                                {aposta.palpite}
                            </p>

                            <p>
                                <strong>Valor Apostado:</strong>{" "}
                                R$ {aposta.valor}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                <span
                                    style={{
                                        color: corStatus(aposta.status),
                                        fontWeight: "bold"
                                    }}
                                >
                                    {aposta.status}
                                </span>
                            </p>

                            <p>
                                <strong>Retorno:</strong>{" "}
                                R$ {aposta.retorno}
                            </p>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default Historico;