import { useState, useEffect, createContext } from "react"
import axiosClient from "../config/AxiosClient"
import { useNavigate } from "react-router-dom"

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [alerta, setAlerta] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() =>{
        const getProjects = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const config = {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await axiosClient.get("/projects", config);
                setProyectos(data)
            } catch (error) {
                console.log(error);
            }
        }
        getProjects()
    }, [])

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
            setProyectos([...proyectos, data])

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

    const getProject = async (id) => {
        setLoading(true);
        try {
           const token = localStorage.getItem("token");
           if (!token) return;

           const config = {
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           };
           
           const { data } = await axiosClient.get(`/projects/${id}`, config);
           setProyecto(data)
        } catch (error) {
            console.log(error)
        }

        setLoading(false);
    }

  return (
    <ProyectosContext.Provider
        value={{
            proyectos,
            showAlert,
            alerta,
            submitProject,
            getProject,
            proyecto,
            loading
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