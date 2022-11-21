import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where('creador').equals(req.usuario);
  res.json(proyectos);
}

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;
  
  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);  
  } catch (error) {
    console.log(error);
  }

};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  const project = await Proyecto.findById(id);

  if (!project) {
    const error = new Error("Project not found");
    return res.status(403).json({ msg: error.message });
  }

  if (project.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Permissions error");
    return res.status(403).json({ msg: error.message });
  }



  res.json( project );
};

const editarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);

  if(!proyecto) {
    const error = new Error("Project not found");
    return res.status(403).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()){
    const error = new Error("Permissions error");
    return res.status(403).json({ msg: error.message });
  }

  proyecto.name = req.body.name || proyecto.name;
  proyecto.description = req.body.description || proyecto.description;
  proyecto.deadline = req.body.deadline || proyecto.deadline;
  proyecto.client = req.body.client || proyecto.client;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id);

  if(!proyecto) {
    const error = new Error("Project not found");
    return res.status(403).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()){
    const error = new Error("Permissions error");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await proyecto.deleteOne();
    res.json({ msg: "Project deleted" })
  } catch (error) {
    console.log(error)
  }
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
};

