import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

const agregarTarea = async (req, res) => {
    const { proyecto } = req.body;
    const getProyecto = await Proyecto.findById(proyecto);

    if(!proyecto) {
        const error = new Error("El proyecto no existe");
        return res.status(404).json({ msg: error.message });
    }

    if(getProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes permisos para añadir tareas");
        return res.status(404).json({ msg: error.message });
    }

    try {
        const setTarea = await Tarea.create(req.body);
        res.json(setTarea)
    } catch (error) {
        console.log(error)
    }
};

const obtenerTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");

    if(!tarea) {
        const error = new Error("No se ha encontrado esta tarea");
        return res.status(404).json({ msg: error.message });
    }
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tienes permisos para acceder a esta tarea");
        return res.status(403).json({ msg: error.message });
    }

    res.json(tarea)
};

const actualizarTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");

    if(!tarea) {
        const error = new Error("No se ha encontrado esta tarea");
        return res.status(404).json({ msg: error.message });
    }
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tienes permisos para acceder a esta tarea");
        return res.status(403).json({ msg: error.message });
    }

    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

    try {
        const tareaActualizada = await tarea.save();
        res.json(tareaActualizada)
    } catch (error) {
        console.log(error);
    }
};
const eliminarTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tarea.findById(id).populate("proyecto");

    if(!tarea) {
        const error = new Error("No se ha encontrado esta tarea");
        return res.status(404).json({ msg: error.message });
    }
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("No tienes permisos para acceder a esta tarea");
        return res.status(403).json({ msg: error.message });
    }

    try {
        await tarea.deleteOne();
        res.json({ msg: "Tarea eliminada"})
    } catch (error) {
        console.log(error)
    }
};
const cambiarEstado = async (req, res) => {};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}