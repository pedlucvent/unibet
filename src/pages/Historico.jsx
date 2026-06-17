import { useEffect, useState } from "react";
import { api } from "../services/api";

function Historico() {
    const [apostas, setApostas] = useState([]);

    useEffect(() => {
        api.get("/apostas").then((res) => {
            setApostas(res.data);
        });
    }, []);

    return (
        <div>
            <h1>Histórico de Apostas</h1>

            {apostas.map((a) => (
                <div key={a.id} style={{ margin: 10, padding: 10, border: "1px solid #ddd" }}>
                    <p>Valor: R$ {a.valor}</p>
                    <p>Status: {a.status}</p>
                </div>
            ))}
        </div>
    );
}

export default Historico;