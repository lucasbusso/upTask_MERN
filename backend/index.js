import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function(origin, callback) {
    if(whitelist.includes(origin)) {
      //Puede mandar la request
      callback(null, true);
    } else {
      //No puede mandar la request
      callback(new Error('CORS Error'));
    }
  }
}
app.use(cors(corsOptions));

//Routing 
app.use('/api/usuarios', usuarioRoutes);
app.use("/api/projects", proyectoRoutes);
app.use("/api/tasks", tareaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});