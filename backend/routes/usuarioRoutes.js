import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  recuperarContrase├▒a,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Autenticacion, confirmar y confirmacion de usuarios
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirm-account/:token", confirmar);
router.post("/reset-password", recuperarContrase├▒a);
router.route("/reset-password/:token")
  .get(comprobarToken)
  .post(nuevoPassword);
router.get("/perfil", checkAuth, perfil);

export default router;