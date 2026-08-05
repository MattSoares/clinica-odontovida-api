/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useState, useEffect} from 'react';
import api from '../api/api.js';

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuario');
        const token = localStorage.getItem('token');

        if (usuarioSalvo && token) {
            setUsuario(JSON.parse(usuarioSalvo));
        }

        setCarregando(false);
    }, []);


    async function login(email, senha) {
            const resposta = await api.post('/auth/login', {email, senha});
            const { token, usuario: dadosUsuario } = resposta.data;

            localStorage.setItem('token', token);
            localStorage.setItem('usuario', JSON.stringify(dadosUsuario));

            setUsuario(dadosUsuario);
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario');
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, login, logout, carregando }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
