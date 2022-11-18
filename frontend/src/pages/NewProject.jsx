import FormularioProyecto from "../components/FormularioProyecto";

const NewProjects = () => {
  return (
    <>
      <h1 className="text-4xl font-bold">New project</h1>

      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default NewProjects;
