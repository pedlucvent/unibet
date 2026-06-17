import { useEffect, useState } from "react";
import { api } from "../services/api";

function Ranking() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        api.get("/usuarios").then((res) => {
            const ordenado = res.data.sort((a, b) => b.saldo - a.saldo);
            setUsuarios(ordenado);
        });
    }, []);

    return (
        <div>
            <h1>Ranking de Jogadores</h1>

            {usuarios.map((u, index) => (
                <div className="card" key={u.id}>
                    #{index + 1} - {u.nome} - Saldo: R$ {u.saldo}
                </div>
            ))}
        </div>
    );
}

export default Ranking;