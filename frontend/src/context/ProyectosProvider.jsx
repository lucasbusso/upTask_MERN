import { useState, useEffect, createContext } from "react"
import axiosClient from "../config/AxiosClient"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client"
import useAuth from "../hooks/useAuth"

let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [alerta, setAlerta] = useState({});
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [tarea, setTarea] = useState({});
    const [collaborator, setCollaborator] = useState({});
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
    const [finder, setFinder] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth();

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
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, [])

    const showAlert = (alerta) => {
        setAlerta(alerta);

        setTimeout(() => {
            setAlerta({ })
        }, 3500);
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
           setProyecto(data);
           setAlerta({})
        } catch (error) {
            navigate("/projects")
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
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

           setAlerta({});
           setModal(false);

           // socket io
           socket.emit('new task', data)
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

           const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config);        
           setAlerta({});
           setModal(false);

           socket.emit('update task', data);
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
            
           setModalDeleteTask(false);
           setTarea({})
           setTimeout(() => {
            setAlerta({})
           }, 3000);

           socket.emit('delete task', tarea)

        } catch (error) {
            console.log(error)
        }
    }

    const submitCollaborator = async (email) => {
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

           const { data } = await axiosClient.post(`/projects/collaborators`, {email}, config);
           setAlerta({
            msg: data.msg,
            error: false
           });
           setCollaborator(data);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        } finally {
            setLoading(false);
        }
    }

    const addCollaborator = async (email) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

           const config = {
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           };

           const { data } = await axiosClient.post(`/projects/collaborators/${proyecto._id}`, email, config);
           setAlerta({
            msg: data.msg,
            error: false
           })
           setCollaborator({});
           setTimeout(() => {
                setAlerta({})
           }, 3000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const handleModalDeleteCollaborator = (collaborator) => {
        setModalDeleteCollaborator(!modalDeleteCollaborator);
        setCollaborator(collaborator);
    }

    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

           const config = { 
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           };

           const { data } = await axiosClient.post(`/projects/delete-collaborator/${proyecto._id}`, {id: collaborator._id},  config);
           const updatedProject = {...proyecto};
           updatedProject.colaboradores = updatedProject.colaboradores.filter( state => state._id !== collaborator._id );
           setProyecto(updatedProject);
           setAlerta({
            msg: data.msg,
            error: false
           })
           setCollaborator({});
           setModalDeleteCollaborator(false);
           setTimeout(() => {
            setAlerta({})
       }, 3000);
        } catch (error) {
            console.log(error.response)
        }
    }

    const completeTask = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

           const config = {
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           };

           const { data } = await axiosClient.post(`/tasks/state/${id}`, {}, config);

           setTarea({});
           setAlerta({});

           socket.emit('chande state', data);
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleFinder = () => {
        setFinder(!finder);
    }

    const submitTaskSocket = (task) => {
        const updatedProject = {...proyecto};
        updatedProject.tasks = [...updatedProject.tasks, task];
        setProyecto(updatedProject); 
    }

    const deleteTaskSocket = (task) => {
        const updatedProject = {...proyecto};
        updatedProject.tasks = updatedProject.tasks.filter( state => state._id !== task._id);
        setProyecto(updatedProject)
    }

    const updateTaskSocket = (task) => {
        const updatedProject = {...proyecto};
        updatedProject.tasks = updatedProject.tasks.map( state => state._id === task._id ? task : state);
        setProyecto(updatedProject);
    }

    const updateStateSocket = (task) => {
        const updatedProject = {...proyecto};
        updatedProject.tasks = updatedProject.tasks.map( state => state._id === task._id ? task : state);
        setProyecto(updatedProject);
    }

    const logOut = () => {
        setProyectos([]);
        setProyecto({});
        setAlerta({});
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
          collaborator,
          modalDeleteCollaborator,
          finder,
          showAlert,
          submitProject,
          getProject,
          deleteProject,
          handleModal,
          submitTask,
          handleModalEditTask,
          handleModalDeleteTask,
          deleteTask,
          submitCollaborator,
          addCollaborator,
          handleModalDeleteCollaborator,
          deleteCollaborator,
          completeTask,
          handleFinder,
          submitTaskSocket,
          deleteTaskSocket,
          updateTaskSocket,
          updateStateSocket,
          logOut,
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