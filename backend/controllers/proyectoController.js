import Proyecto from "../models/Proyecto.js"
import Usuario from "../models/Usuarios.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where('creador').equals(req.usuario).select("-tasks");
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
  const project = await Proyecto.findById(id).populate("tasks").populate("colaboradores", "name email");

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

const buscarColaborador = async (req, res) => { 
  const {email} = req.body;
  const user = await Usuario.findOne({email}).select('-confirmado -createdAt -password -token -updatedAt -__v')

  if(!user){
    const error = new Error('User not found');
    return res.status(404).json({msg: error.message});
  }

  res.json(user);
};

const agregarColaborador = async (req, res) => {
  const project = await Proyecto.findById(req.params.id);

  if(!project) {
    const error = new Error('Project not found');
    return res.status(404).json({msg: error.message});
  }

  if(project.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Permissions failed');
    return res.status(404).json({msg: error.message});
  }

  const {email} = req.body;
  const user = await Usuario.findOne({email}).select('-confirmado -createdAt -password -token -updatedAt -__v')

  if(!user){
    const error = new Error('User not found');
    return res.status(404).json({msg: error.message});
  }

  if(project.creador.toString() === user._id.toString()) {
    const error = new Error("You are the owner of this project");
    return res.status(404).json({msg: error.message});
  }

  if(project.colaboradores.includes(user._id)) {
    const error = new Error("This user's already a team member");
    return res.status(404).json({msg: error.message});
  }

  project.colaboradores.push(user._id);
  await project.save();
  res.json({msg: "Team member added"});

};

const eliminarColaborador = async (req, res) => {
  const project = await Proyecto.findById(req.params.id);

  if(!project) {
    const error = new Error('Project not found');
    return res.status(404).json({msg: error.message});
  }

  if(project.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Permissions failed');
    return res.status(404).json({msg: error.message});
  }

  project.colaboradores.pull(req.body.id);
  await project.save();
  res.json({msg: "Team member deleted"});
};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  buscarColaborador,
};

