import { useEffect, useState } from "react";
import { api } from "../services/api";

function Apostar() {
    const [eventos, setEventos] = useState([]);
    const [eventoId, setEventoId] = useState("");
    const [valor, setValor] = useState("");

    useEffect(() => {
        api.get("/eventos").then((res) => {
            setEventos(res.data);
        });
    }, []);

    const fazerAposta = async () => {
        const novaAposta = {
            usuarioId: 2, // simulado
            eventoId: Number(eventoId),
            valor: Number(valor),
            status: "pendente",
            palpite: "timeA",
            retorno: 0
        };

        await api.post("/apostas", novaAposta);

        alert("Aposta realizada!");
    };

    return (
        <div>
            <h1>Apostar</h1>

            <select onChange={(e) => setEventoId(e.target.value)}>
                <option>Selecione um evento</option>
                {eventos.map((e) => (
                    <option key={e.id} value={e.id}>
                        {e.timeA} vs {e.timeB}
                    </option>
                ))}
            </select>

            <br />

            <input
                placeholder="Valor da aposta"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
            />

            <br />

            <button onClick={fazerAposta}>
                Apostar
            </button>
        </div>
    );
}

export default Apostar;