import { dateFormatter } from "../helpers/dateFormatter";

const Task = ({task}) => {
    const {description, name, priority, deadline, state, _id} = task;

    return (
        <div
            className="border-b p-5 flex justify-between items-center"
        >
            <div>
                <p className="text-2xl mb-1">{name}</p>
                <p className="text-sm text-gray-500 uppercase mb-1">{description}</p>
                <p className="text-md mb-1">{ dateFormatter(deadline)  }</p>
                <p className="text-sm text-gray-600 mb-1">Priority: {priority}</p>
            </div>
            <div className="flex gap-2">
                <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
                    Edit
                </button>
                {state ? (
                    <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
                        Complete
                    </button>
                ) : (
                    <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
                        Incomplete
                    </button>
                )}
                <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Task