import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    const login = async (email, senha) => {
        const resposta = await api.get("/usuarios");

        const usuarioEncontrado = resposta.data.find(
            (u) => u.email === email && u.senha === senha
        );

        if (!usuarioEncontrado) {
            return false;
        }

        setUsuario(usuarioEncontrado);
        return usuarioEncontrado;
    };

    const logout = () => {
        setUsuario(null);
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}