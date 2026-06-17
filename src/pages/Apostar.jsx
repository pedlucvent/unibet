import { useEffect, useState } from "react";
import { api } from "../services/api";

function Apostar() {
    const [eventos, setEventos] = useState([]);
    const [eventoId, setEventoId] = useState("");
    const [valor, setValor] = useState("");

    useEffect(() => {
        api.get("/eventos").then((res) => {
            // Exibe apenas eventos abertos
            const eventosAbertos = res.data.filter(
                (evento) => evento.status === "aberto"
            );

            setEventos(eventosAbertos);
        });
    }, []);

    const fazerAposta = async () => {
        const usuarioId = 2; // usuário de teste

        if (!eventoId) {
            alert("Selecione um evento.");
            return;
        }

        if (!valor || Number(valor) <= 0) {
            alert("Informe um valor válido.");
            return;
        }

        try {
            // Busca o usuário
            const usuarioResposta = await api.get(
                `/usuarios/${usuarioId}`
            );

            const usuario = usuarioResposta.data;

            // Verifica saldo
            if (usuario.saldo < Number(valor)) {
                alert("Saldo insuficiente!");
                return;
            }

            // Atualiza saldo
            await api.patch(`/usuarios/${usuarioId}`, {
                saldo: usuario.saldo - Number(valor)
            });

            // Busca o evento para definir o palpite
            const eventoResposta = await api.get(
                `/eventos/${eventoId}`
            );

            const evento = eventoResposta.data;

            const novaAposta = {
                usuarioId,
                eventoId: Number(eventoId),
                valor: Number(valor),
                status: "pendente",
                palpite: evento.timeA,
                retorno: 0
            };

            await api.post("/apostas", novaAposta);

            alert("Aposta realizada com sucesso!");

            setEventoId("");
            setValor("");

        } catch (erro) {
            console.error(erro);
            alert("Erro ao realizar aposta.");
        }
    };

    return (
    <div className="page-container centralizado">
            <h1>Apostar</h1>

            <select
                value={eventoId}
                onChange={(e) => setEventoId(e.target.value)}
            >
                <option value="">
                    Selecione um evento
                </option>

                {eventos.map((evento) => (
                    <option
                        key={evento.id}
                        value={evento.id}
                    >
                        {evento.timeA} vs {evento.timeB}
                    </option>
                ))}
            </select>

            <br />
            <br />

            <input
                type="number"
                min="1"
                placeholder="Valor da aposta"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
            />

            <br />
            <br />

            <button onClick={fazerAposta}>
                Apostar
            </button>
        </div>
    );
}

export default Apostar;