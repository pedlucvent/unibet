import { useEffect, useState } from "react";
import { api } from "../services/api";

function Ranking() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        api.get("/usuarios").then((res) => {
            const ordenado = [...res.data].sort(
                (a, b) => b.saldo - a.saldo
            );

            setUsuarios(ordenado);
        });
    }, []);

    return (
        <div className="page-container">
            <h1>🏆 Ranking de Jogadores</h1>

            <div className="ranking-container">
                {usuarios.map((usuario, index) => (
                    <div
                        className={`ranking-card ${
                            index === 0
                                ? "ouro"
                                : index === 1
                                ? "prata"
                                : "bronze"
                        }`}
                        key={usuario.id}
                    >
                        <div>
                            <h3>
                                #{index + 1} - {usuario.nome}
                            </h3>
                        </div>

                        <div>
                            <strong>
                                R$ {usuario.saldo}
                            </strong>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ranking;