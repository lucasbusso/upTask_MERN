import useProyectos from "../hooks/useProyectos"
import PreviewProject from "../components/PreviewProject";

const Proyectos = () => {
  const { proyectos } = useProyectos();

  return (
    <>
      <h1 className="text-4xl font-bold">Projects</h1>

      <div className="bg-white shadow mt-10 roundend-lg">
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProject 
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
        : "No hay proyectos"}
      </div>
    </>
  )
}

export default Proyectos