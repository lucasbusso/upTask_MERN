import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import FormularioProyecto from "../components/FormularioProyecto";

const EditProject = () => {
    const params = useParams();
    const { getProject, proyecto, loading } = useProyectos();

    useEffect(() => {
        getProject(params.id);
    }, []);

    const { name } = proyecto;

    if(loading) return 'Loading...'

  return (
    <div>
      <p>Editando:</p>
      <h1 className="font-black text-4xl">{name}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </div>
  );
}

export default EditProject