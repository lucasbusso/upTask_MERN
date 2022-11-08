import Usuario from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  const { email } = req.body; //para extraer valores de un formulario es con req.body
  const existeUsuario = await Usuario.findOne({ email });
  
  
  //Evitar registro duplicado
  if (existeUsuario) {
    const error = new Error("Este email ya ha sido utilizado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
}

const autenticar = async (req, res) => {
  const { email, password } = req.body; //para extraer valores de un formulario es con req.body
  const usuario = await Usuario.findOne({ email });

  //Comprobar si el usuario existe
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("El email no ha sido verificado");
    return res.status(403).json({ msg: error.message });
  }

  //Comprobar el password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("Contraseña incorrecta");
    return res.status(403).json({ msg: error.message });
  }
}

const confirmar = async (req, res) => {
    const {token} = req.params;  //para extraer valores de la url es con req.params
    const usuarioConfirmar = await Usuario.findOne({token});

    if(!usuarioConfirmar) {
        const error = new Error("Token no valido");
        return res.status(403).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        res.json({msg: "Verificación exitosa"})
    } catch (error) {
        console.log(error);
    }
}

const recuperarContraseña = async (req, res) => {
  const { email } = req.body; //para extraer valores de un formulario es con req.body
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    res.json({ msg: "Revisa tu correo" });
  } catch (error) {
    console.log(error);
  }
}

const comprobarToken = async (req, res) => {
  const { token } = req.params; //para extraer valores de la url es con req.params
  const tokenValido = await Usuario.findOne({ token });

  if(tokenValido) {
    res.json({ msg: "Token válido, el usuario existe"});
  } else {
        const error = new Error("El token no es válido");
        return res.status(404).json({ msg: error.message });
  }
}

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const usuario = await Usuario.findOne({ token });


  if (usuario) {
    usuario.password = password;
    usuario.token = '';

    try {
      await usuario.save()
      return res.json({msg: "Contraseña modificada correctamente"})
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("El token no es válido");
    return res.status(404).json({ msg: error.message });
  }
  console.log(token);
  console.log(password);
};

const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
}

export {
  registrar,
  autenticar,
  confirmar,
  recuperarContraseña,
  comprobarToken,
  nuevoPassword,
  perfil,
};