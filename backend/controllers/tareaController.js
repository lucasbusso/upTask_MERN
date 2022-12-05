import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const agregarTarea = async (req, res) => {
    const { project } = req.body;
    const getProject = await Proyecto.findById(project);

    if(!getProject) {
        const error = new Error("Project not found");
        return res.status(404).json({ msg: error.message });
    }

    if(getProject.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Permissions failed");
        return res.status(404).json({ msg: error.message });
    }

    try {
        const setTarea = await Tarea.create(req.body);
        // Save ID in the project
        getProject.tasks.push(setTarea._id)
        await getProject.save();  
        res.json(setTarea)
    } catch (error) {
        console.log(error)
    }
};

const obtenerTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("project");

    if(!tarea) {
        const error = new Error("No se ha encontrado esta tarea");
        return res.status(404).json({ msg: error.message });
    }
    if(tarea.project.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tienes permisos para acceder a esta tarea");
        return res.status(403).json({ msg: error.message });
    }

    res.json(tarea)
};

const actualizarTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("project");

    if(!tarea) {
        const error = new Error("Task not found");
        return res.status(404).json({ msg: error.message });
    }
    if(tarea.project.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Permissions failed");
        return res.status(403).json({ msg: error.message });
    }

    tarea.name = req.body.name || tarea.name;
    tarea.description = req.body.description || tarea.description;
    tarea.priority = req.body.priority || tarea.priority;
    tarea.deadline = req.body.deadline || tarea.deadline;

    try {
        const tareaActualizada = await tarea.save();
        res.json(tareaActualizada)
    } catch (error) {
        console.log(error);
    }
};
const eliminarTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("project");

    if(!tarea) {
        const error = new Error("Task not found");
        return res.status(404).json({ msg: error.message });
    }
    if(tarea.project.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Only the author of this task can delete it");
        return res.status(403).json({ msg: error.message });
    }

    try {
        const project = await Proyecto.findById(tarea.project);
        project.tasks.pull(tarea._id);

        await Promise.allSettled([await project.save(), await tarea.deleteOne()])

        res.json({ msg: "Task deleted"})
    } catch (error) {
        console.log(error)
    }
};
const cambiarEstado = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("project");

    if(!tarea) {
        const error = new Error("Task not found");
        return res.status(404).json({ msg: error.message });
    }

    if(tarea.project.creador.toString() !== req.usuario._id.toString() && !tarea.project.colaboradores.some((colaborador)  => colaborador._id.toString() === req.usuario._id.toString())) {
        const error = new Error("Only the author of this task can delete it");
        return res.status(403).json({ msg: error.message });
    }

    tarea.state = !tarea.state;
    await tarea.save();
    res.json(tarea);
};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}