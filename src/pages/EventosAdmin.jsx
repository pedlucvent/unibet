import { useEffect, useState } from "react";
import { api } from "../services/api";

function EventosAdmin() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const buscarEventos = async () => {
            const resposta = await api.get("/eventos");
            setEventos(resposta.data);
        };

        buscarEventos();
    }, []);

    const carregarEventos = async () => {
        const resposta = await api.get("/eventos");
        setEventos(resposta.data);
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
}   // fecha o for

carregarEventos();

alert("Resultado registrado!");
};

    return (
        <div>
            <h1>Painel do Administrador</h1>

            {eventos.map((evento) => (
                <div
                    key={evento.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: 10,
                        margin: 10
                    }}
                >
                    <h3>
                        {evento.timeA} x {evento.timeB}
                    </h3>

                    <p>Esporte: {evento.esporte}</p>
                    <p>Status: {evento.status}</p>
                    <p>Resultado: {evento.resultado || "Não definido"}</p>

                    {evento.status === "aberto" && (
                        <button
                            onClick={() => encerrarEvento(evento.id)}
                        >
                            Encerrar apostas
                        </button>
                    )}

                    {evento.status !== "finalizado" && (
                        <div style={{ marginTop: 10 }}>
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
                                style={{ marginLeft: 10 }}
                            >
                                Vitória {evento.timeB}
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default EventosAdmin;