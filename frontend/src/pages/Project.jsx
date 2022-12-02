import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Modal from "../components/Modal";
import ModalDeleteTask from "../components/ModalDeleteTask";
import Task from "../components/Task";
import Alerta from "../components/Alerta";

const Project = () => {
  const params = useParams();
  const { getProject, proyecto, loading, handleModal, alerta } = useProyectos();

  useEffect(() => {
      getProject(params.id); 
  }, []);

  const { name } = proyecto;
  const { msg } = alerta;

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{name}</h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          <Link to={`/projects/edit/${params.id}`}>Edit</Link>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 text-md px-5 py-3 w-full md:w-auto rounded-lg font-bold bg-sky-500 text-center text-white flex gap-2 items-center"
        onClick={ handleModal }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            clipRule="evenodd"
          />
        </svg>
        New task
      </button>
      
      <div className="flex justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4">
          { msg && <Alerta alerta={alerta} />}
        </div>
      </div>

      <p className="font-bold text-xl mt-10">Project tasks</p>
      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.tasks?.length ? 
          proyecto.tasks?.map( task => (
            <Task 
              key={task._id}
              task={task}
            />
          ))
          : <p className="text-center my-5 p-10">No tasks entries</p>}
      </div>
      
      <div className="flex items-center justify-between mt-10">
        <p className="font-bold text-xl ">Collaborators</p>
        <Link
          to={`/projects/add-member/${proyecto._id}`}
          className="text-gray-400 uppercase font-semi  bold hover:text-black"
        >
            Add team member
        </Link>
      </div>
      
      <Modal />
      <ModalDeleteTask />

    </>
  );
}

export default Project