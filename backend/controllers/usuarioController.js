import Usuario from "../models/Usuarios.js";

const registrar = async (req, res) => {
    //Evitar registro duplicado

    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email});

    if(existeUsuario) {
        const error = new Error('Este email ya ha sido utilizado');
        return res.status(400).json({msg: error.message})
    }
    try {
        const usuario = new Usuario(req.body);
        const usuarioAlmacenado = await usuario.save(); 
        res.json(usuarioAlmacenado);

    } catch (error) {
        console.log(error)
    }

}

export {
    registrar
}