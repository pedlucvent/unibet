import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        console.log("Email:", email);
        console.log("Senha:", senha);

        alert("Tela de login criada!");
    };

    return (
        <div>
            <h1>UniBet</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Senha:</label>
                    <br />
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;