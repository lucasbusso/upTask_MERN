import express from "express";
import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  buscarColaborador,
} from "../controllers/proyectoController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get('/', checkAuth, obtenerProyectos);
router.post("/", checkAuth, nuevoProyecto);
router
  .route("/:id")
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);
router.post('/collaborators', checkAuth, buscarColaborador);
router.post('/collaborators/:id', checkAuth, agregarColaborador);
router.post("/delete-collaborator/:id", checkAuth, eliminarColaborador);

export default router;