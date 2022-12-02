import { useState, useEffect, createContext } from "react"
import axiosClient from "../config/AxiosClient"
import { useNavigate } from "react-router-dom"

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [alerta, setAlerta] = useState({});
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [tarea, setTarea] = useState({});

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

    const showAlert = (alerta) => {
        setAlerta(alerta);

        setTimeout(() => {
            setAlerta({ })
        }, 3000);
    }

    const submitProject = async (project) => {
        if(project.id) {
            await editProject(project);
        } else {
            await newProject(project);
        }
    }

    const editProject = async (project) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
            };

            const {data} = await axiosClient.put(`/projects/${project.id}`, project, config);

            //Actualiza la lista de proyectos del path /projects cuando guardas cambios de edit
            const updatedProjects = proyectos.map(stateProject => stateProject._id === data._id ? data : stateProject);
            setProyectos(updatedProjects);

            setAlerta({
                msg: "Changes saved",
                error: false,
            });

            setTimeout(() => {
                setAlerta({});
                navigate("/projects");
            }, 2500);

        } catch (error) {
            console.log(error)
        }
    }

    const newProject = async (project) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosClient.post("/projects", project, config);
            setProyectos([...proyectos, data]);

            setAlerta({
                msg: "New project created",
                error: false,
            });

            setTimeout(() => {
                setAlerta({});
                navigate("/projects");
            }, 4000);
        } catch (error) {
            console.log(error);
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

    const deleteProject = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axiosClient.delete(`/projects/${id}`, config);
           
            const updatedProjects = proyectos.filter(stateProject => stateProject._id !== id)
            setProyectos(updatedProjects);

            setAlerta({
                msg: data.msg, 
                error: false
            });

            setTimeout(() => {
                setAlerta({});
                navigate("/projects");
            }, 1000);

        } catch (error) {
            console.assert.log(error)
        }
    }

    const handleModal = () => {
        setModal(!modal);
        setTarea({});
    }

    const submitTask = async (task) => {
        if(task?.id) {
            await editTask(task);
        } else {
            await createTask(task);
        }
    }

    const createTask = async (task) => {
        try {
            const token = localStorage.getItem("token");
           if (!token) return;

           const config = {
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           };

           const { data } = await axiosClient.post("/tasks", task, config);

           //Add task to the state
           const updatedProject = {...proyecto};
           updatedProject.tasks = [...proyecto.tasks, data];

           setProyecto(updatedProject);
           setAlerta({});
           setModal(false);
        } catch (error) {
            console.log(error)
        }
    } 

    const editTask = async (task) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

           const config = {
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           };

           const { data } = await axiosClient.put(`/tasks/${tarea._id}`, task, config);
            
           const updatedProject = {...proyecto};
           updatedProject.tasks = updatedProject.tasks.map( taskState => taskState._id === data._id ? data : taskState);
           setProyecto(updatedProject);
           setAlerta({});
           setModal(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalEditTask = (task) => {
        setTarea(task);
        setModal(true);  
    }

    const handleModalDeleteTask = (task) => {
        setTarea(task);
        setModalDeleteTask(!modalDeleteTask);
    }

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

           const config = {
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           };

           const { data } = await axiosClient.delete(`/tasks/${tarea._id}`, config);
           setAlerta({
            msg: data.msg,
            error: false
           });
            
           const updatedProject = {...proyecto};
           updatedProject.tasks = updatedProject.tasks.filter(state => state._id !== tarea._id);
           setProyecto(updatedProject);
           setModalDeleteTask(false);
           setTarea({})
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <ProyectosContext.Provider
        value={{
          proyectos,
          alerta,
          proyecto,
          loading,
          modal,
          tarea,
          modalDeleteTask,
          showAlert,
          submitProject,
          getProject,
          deleteProject,
          handleModal,
          submitTask,
          handleModalEditTask,
          handleModalDeleteTask,
          deleteTask,
        }}
      >
        {children}
      </ProyectosContext.Provider>
    );
}

export {
    ProyectosProvider
}
export default ProyectosContext