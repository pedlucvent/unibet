import { useEffect, useState } from "react";
import { api } from "../services/api";

function Apostar() {
    const [eventos, setEventos] = useState([]);
    const [eventoId, setEventoId] = useState("");
    const [palpite, setPalpite] = useState("");
    const [valor, setValor] = useState("");

    useEffect(() => {
        api.get("/eventos").then((res) => {
            const eventosAbertos = res.data.filter(
                (evento) => evento.status === "aberto"
            );

            setEventos(eventosAbertos);
        });
    }, []);

    const eventoSelecionado = eventos.find(
        (evento) => String(evento.id) === String(eventoId)
    );

    const fazerAposta = async () => {
        const usuarioId = 2;

        if (!eventoId) {
            alert("Selecione um evento.");
            return;
        }

        if (!palpite) {
            alert("Selecione um time.");
            return;
        }

        if (!valor || Number(valor) <= 0) {
            alert("Informe um valor válido.");
            return;
        }

        try {
            const usuarioResposta = await api.get(
                `/usuarios/${usuarioId}`
            );

            const usuario = usuarioResposta.data;

            if (usuario.saldo < Number(valor)) {
                alert("Saldo insuficiente!");
                return;
            }

            await api.patch(`/usuarios/${usuarioId}`, {
                saldo: usuario.saldo - Number(valor)
            });

            const novaAposta = {
                usuarioId,
                eventoId: Number(eventoId),
                valor: Number(valor),
                status: "pendente",
                palpite,
                retorno: 0
            };

            await api.post("/apostas", novaAposta);

            alert("Aposta realizada com sucesso!");

            setEventoId("");
            setPalpite("");
            setValor("");

        } catch (erro) {
            console.error(erro);
            alert("Erro ao realizar aposta.");
        }
    };

    return (
        <div className="page-container centralizado">
            <h1>Realizar Aposta</h1>

            <div className="aposta-card">
                <p className="aposta-texto">
                    Escolha um evento disponível,
                    selecione o time e informe o valor da sua aposta fictícia.
                </p>

                <select
                    value={eventoId}
                    onChange={(e) => {
                        setEventoId(e.target.value);
                        setPalpite("");
                    }}
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

                {eventoSelecionado && (
                    <select
                        value={palpite}
                        onChange={(e) => setPalpite(e.target.value)}
                    >
                        <option value="">
                            Escolha o time
                        </option>

                        <option value={eventoSelecionado.timeA}>
                            {eventoSelecionado.timeA}
                        </option>

                        <option value={eventoSelecionado.timeB}>
                            {eventoSelecionado.timeB}
                        </option>
                    </select>
                )}

                <input
                    type="number"
                    min="1"
                    placeholder="Valor da aposta"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />

                <button onClick={fazerAposta}>
                    Confirmar Aposta
                </button>
            </div>
        </div>
    );
}

export default Apostar;