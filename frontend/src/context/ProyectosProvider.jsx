import { useState, useEffect, createContext } from "react"
import axiosClient from "../config/AxiosClient"
import { useNavigate } from "react-router-dom"

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
    const [proyectos, setProyectos] = useState({});
    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();

    const showAlert = alerta => {
        setAlerta(alerta);

        setTimeout(() => {
            setAlerta({ })
        }, 5000);
    }

    const submitProject = async project => {
        try {
            const token = localStorage.getItem('token');
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.post("/projects", project, config); 

            setAlerta({
                msg: 'New project created',
                error: false
            })

            setTimeout(() => {
                setAlerta({});
                navigate('/projects');
            }, 4000);
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <ProyectosContext.Provider
        value={{
            proyectos,
            showAlert,
            alerta,
            submitProject
        }}
    >
        {children}
    </ProyectosContext.Provider>
)
}

export {
    ProyectosProvider
}
export default ProyectosContext