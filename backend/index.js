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

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


//SOCKET.IO
import { Server } from 'socket.io';

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  }
})

io.on('connection', (socket) => {
  console.log("Conectado a socket.io")
  
  //Definir los eventos de socket.io
  socket.on("open project", (project) => {
    socket.join(project);
  })

  socket.on('new task', (task) => {
    const project = task.project;
    socket.to(project).emit('task added', task);
  })

  socket.on("delete task", (task) => {
    const project = task.project;
    socket.to(project).emit('task deleted', task);
  })

  socket.on("update task", (task) => {
    const project = task.project._id;
    socket.to(project).emit('task updated', task);
  })

  socket.on('change state', (task) => {
    const project = task.project._id;
    socket.to(project).emit('state changed', task);
  })
})