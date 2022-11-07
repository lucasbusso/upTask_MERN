import Usuario from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js";

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
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save(); 
        res.json(usuarioAlmacenado);

    } catch (error) {
        console.log(error)
    }

}

const autenticar = async (req, res) => {
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({email});

  //Comprobar si el usuario existe
    if(!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message});
    }

  //Comprobar si el usuario esta confirmado
   if (!usuario.confirmado) {
     const error = new Error("El email no ha sido confirmado");
     return res.status(403).json({ msg: error.message });
   }
  //Comprobar el password
  if(await usuario.comprobarPassword(password)){
    res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email 
    })
  } else {
    const error = new Error("Contraseña incorrecta");
    return res.status(403).json({ msg: error.message });
  }
}

export { registrar, autenticar };