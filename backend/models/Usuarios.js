import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: required,
            type: String,
            trim: true,
        },
        password: {
            type: required,
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        token: {
            type: String
        },
        confirmado: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;