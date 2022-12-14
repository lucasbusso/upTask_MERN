import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/AxiosClient";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    // const navigate = useNavigate();

    useEffect(() => {
        const userAuth = async () => {
            const token = localStorage.getItem("token");

            if(!token) {
                setCargando(false);
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axiosClient.get('/usuarios/perfil', config);
                setAuth(data);
                // navigate('/projects');
            } catch (error) {
                setAuth({})
            }
            setCargando(false)
        }      
        
        userAuth();  
    }, []);

    const logOutAuth = () => {
        setAuth({})
    }
    
    return (
        <AuthContext.Provider
            value={{
                auth,
                cargando,
                setAuth,
                logOutAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;