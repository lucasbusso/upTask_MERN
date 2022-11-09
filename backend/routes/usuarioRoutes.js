import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  recuperarContraseña,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Autenticacion, confirmar y confirmacion de usuarios
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/recuperar-password", recuperarContraseña);
router.route("/recuperar-password/:token")
  .get(comprobarToken)
  .post(nuevoPassword);
router.get("/perfil", checkAuth, perfil);

export default router;