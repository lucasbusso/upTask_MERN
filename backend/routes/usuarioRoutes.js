import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("desde API/USUARIOS")
});

router.post("/", (req, res) => {
  res.send("desde POST API/USUARIOS");
});

router.put("/", (req, res) => {
  res.send("desde PUT API/USUARIOS");
});

export default router;