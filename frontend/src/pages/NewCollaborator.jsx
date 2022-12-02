import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import MemberForm from "../components/memberForm"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"

const NewCollaborator = () => {
    const { getProject, proyecto, loading, collaborator, addCollaborator, alerta } = useProyectos();
    const params = useParams();

    useEffect(() => {
        getProject(params.id)
    }, []);

    if(!proyecto?._id) return <Alerta alerta={alerta} />
    return (
        <>
            <h1 className="text-4xl font-bold">Add team member.</h1>
            <span className="text-sky-600 text-lg">Project: &nbsp; 
            <Link
                to={`/projects/${proyecto._id}`}
                className="underline"
            >{proyecto.name}</Link>
            </span>
            <div className="mt-10 flex justify-center">
                <MemberForm />
            </div>

            {loading ? <p className="text-center mt-20">Loading...</p> : collaborator?._id && (
                <div className="flex justify-center mt-10">
                    <div className="bg-white py-10 px-5 md:w-2/3 rounded shadow">
                        <h2 className="text-center mb-10 text-2xl font-bold">Results:</h2>

                        <div className="flex justify-between items-center">
                            <p>{collaborator.name}</p>
                            <button
                                type="button"
                                className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                                onClick={() => addCollaborator({email: collaborator.email})}
                            >
                                Add team member 
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NewCollaborator