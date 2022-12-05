import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
import { dateFormatter } from "../helpers/dateFormatter";

const Task = ({task}) => {
    const {description, name, priority, deadline, state, _id} = task;
    const { handleModalEditTask, handleModalDeleteTask, completeTask } = useProyectos();
    const admin = useAdmin();

    return (
        <div
            className="border-b p-5 flex justify-between items-center"
        >
            <div className="flex flex-col items-start">
                <p className="text-2xl mb-1">{name}</p>
                <p className="text-sm text-gray-500 uppercase mb-1">{description}</p>
                <p className="text-md mb-1">{ dateFormatter(deadline)  }</p>
                <p className="text-sm text-gray-600 mb-1">Priority: {priority}</p>
                { state && <p className="text-xs bg-green-600 p-1 rounded text-white">Completed by: {task.complete.name}</p>}
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
                {admin && 
                    <button 
                    className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleModalEditTask(task)}
                    >
                        Edit
                    </button>
                }
                <button 
                    className={`${state ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={() => completeTask (_id)}
                >{state ? 'Complete' :  'Incomplete'}
                </button>
                {admin && 
                    <button 
                    className="bg-red-600 px-4 py-3 text-white  uppercase font-bold text-sm rounded-lg"
                    onClick={() => handleModalDeleteTask(task)}
                    >
                        Delete
                    </button>
                }
            </div>
        </div>
    )
}

export default Task