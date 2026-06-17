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
                <div className="card" key={evento.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
                    <h3>{evento.timeA} vs {evento.timeB}</h3>
                    <p>Esporte: {evento.esporte}</p>
                    <p>Status: {evento.status}</p>
                </div>
            ))}
        </div>
    );
}

export default Eventos;