import express from "express";
const router = express.Router();
import { registrar, autenticar } from "../controllers/usuarioController.js";

//Autenticacion, confirmar y confirmacion de usuarios
router.post("/", registrar);
router.post("/login", autenticar);

export default router;