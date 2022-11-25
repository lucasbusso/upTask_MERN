import mongoose from "mongoose";

const proyectoSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  deadline: {
    type: Date,
    default: Date.now(),
  },
  client: {
    type: String,
    trim: true,
    required: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,  
      ref: "Task"
    }
  ],
  colaboradores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  ],
}, 
{
    timestampos: true
});

const Proyecto = mongoose.model("Proyecto", proyectoSchema);

export default Proyecto;