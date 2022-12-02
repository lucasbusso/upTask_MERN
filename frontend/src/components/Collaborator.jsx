import useProyectos from "../hooks/useProyectos";

const Collaborator = ({collaborator}) => {
    const { email, name } = collaborator;
    const { handleModalDeleteCollaborator } = useProyectos();
    return (
    <div className="border-b p-5 flex justify-between items-center">
        <div>
            <p>{name}</p>
            <p className="tex-sm text-gray-700">{email}</p>
        </div>
        <div>
            <button
                type="button"
                className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                onClick={() => handleModalDeleteCollaborator(collaborator)}
            >Delete</button>
        </div>
    </div>
    )
}

export default Collaborator