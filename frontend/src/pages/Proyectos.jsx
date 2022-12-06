import { useEffect } from "react";
import useProyectos from "../hooks/useProyectos"
import PreviewProject from "../components/PreviewProject";
import Alerta from "../components/Alerta";

const Proyectos = () => {
  const { proyectos, alerta } = useProyectos();
  
  const { msg } = alerta;

  return (
    <>
      <h1 className="text-4xl font-bold">Projects</h1>

      { msg && <Alerta alerta={alerta}/>}

      <div className="bg-white shadow mt-10 roundend-lg">
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProject 
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
        : <p className="text-center my-5 p-10">No projects yet</p>}
      </div>
    </>
  )
}

export default Proyectos