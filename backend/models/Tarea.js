import mongoose from "mongoose";

const tareaSchema = mongoose.Schema({
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
    state: {
        type: Boolean,
        default: false,
    },
    deadline: {
        type: Date,
        required: true,
        default: Date.now()
    },
    priority: {
        type: String,
        required: true,
        enum: ["Low", "Medium", "High"]
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto",
    }
}, {
    timestamps: true
});

const Tarea = mongoose.model("Task", tareaSchema);

export default Tarea;