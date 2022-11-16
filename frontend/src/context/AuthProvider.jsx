import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/AxiosClient";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const userAuth = async () => {
            const token = localStorage.getItem("token");

            if(!token) {
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
            } catch (error) {
                console.log(error)
            }
        }      
        
        userAuth();  
    },[]);
    
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth
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