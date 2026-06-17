import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = localStorage.getItem("usuario");
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
    });

    const login = async (email, senha) => {
        const resposta = await api.get("/usuarios");

        const usuarioEncontrado = resposta.data.find(
            (u) => u.email === email && u.senha === senha
        );

        if (!usuarioEncontrado) {
            return false;
        }

        setUsuario(usuarioEncontrado);
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

        return usuarioEncontrado;
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}