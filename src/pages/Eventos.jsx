import { useEffect, useState } from "react";
import { api } from "../services/api";

function Eventos() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        api.get("/eventos").then((res) => {
            setEventos(res.data);
        });
    }, []);

    return (
        <div className="page-container">
            <h1>Eventos Disponíveis</h1>

            {eventos.map((evento) => (
                <div className="card" key={evento.id}>
                    <h3>
                        {evento.timeA} vs {evento.timeB}
                    </h3>

                    <p>
                        <strong>Esporte:</strong> {evento.esporte}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        <span
                            style={{
                                color:
                                    evento.status === "aberto"
                                        ? "#22c55e"
                                        : evento.status === "encerrado"
                                        ? "#f59e0b"
                                        : "#ef4444",
                                fontWeight: "bold"
                            }}
                        >
                            {evento.status}
                        </span>
                    </p>

                    {evento.data && (
                        <p>
                            <strong>Data:</strong> {evento.data}
                        </p>
                    )}

                    {evento.resultado && (
                        <p>
                            <strong>Resultado:</strong> {evento.resultado}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Eventos;