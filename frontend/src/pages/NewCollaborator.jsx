import { useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import MemberForm from "../components/memberForm"
import { useParams } from "react-router-dom"

const NewCollaborator = () => {
    const { getProject, proyecto, loading } = useProyectos();
    const params = useParams();

    useEffect(() => {
        getProject(params.id)
    }, []);

    if(loading) return 'Loading...'

    return (
        <>
            <h1 className="text-4xl font-bold">Add team member.</h1>
            <span className="text-sky-600 text-lg">Project: {proyecto.name}</span>
            <div className="mt-10 flex justify-center w-1/2">
                <MemberForm />
            </div>
        </>
    )
}

export default NewCollaborator