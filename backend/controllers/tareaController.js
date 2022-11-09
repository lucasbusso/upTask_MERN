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
const obtenerTarea = async (req, res) => {};
const actualizarTarea = async (req, res) => {};
const eliminarTarea = async (req, res) => {};
const cambiarEstado = async (req, res) => {};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}