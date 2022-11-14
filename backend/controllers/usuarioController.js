import Usuario from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { registerEmail, resetPassword } from "../helpers/email.js";

const registrar = async (req, res) => {
  const { email } = req.body; //para extraer valores de un formulario es con req.body
  const existeUsuario = await Usuario.findOne({ email });
  
  
  //Evitar registro duplicado
  if (existeUsuario) {
    const error = new Error("Email already in use");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    await usuario.save();

    //Enviar email de confirmacion
    registerEmail({
      email: usuario.email,
      name: usuario.name,
      token: usuario.token
    })

    res.json({ msg: "Check your email to verify your account"});
  } catch (error) {
    console.log(error);
  }
}

const autenticar = async (req, res) => {
  const { email, password } = req.body; //para extraer valores de un formulario es con req.body
  const usuario = await Usuario.findOne({ email });

  //Comprobar si el usuario existe
  if (!usuario) {
    const error = new Error("The user don't exist");
    return res.status(404).json({ msg: error.message });
  }

  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("You have to verify the email");
    return res.status(403).json({ msg: error.message });
  }

  //Comprobar el password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("Incorrect Password");
    return res.status(403).json({ msg: error.message });
  }
}

const confirmar = async (req, res) => {
    const {token} = req.params;  //para extraer valores de la url es con req.params
    const usuarioConfirmar = await Usuario.findOne({token});

    // if(!usuarioConfirmar) {
    //     const error = new Error("Invalid token");
    //     return res.status(403).json({ msg: error.message });
    // }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save();
        res.json({msg: "Status: email verified successfully"})
    } catch (error) {
      res.json({msg: "Status: the confirmation's failed"})
    }
}

const recuperarContraseña = async (req, res) => {
  const { email } = req.body; //para extraer valores de un formulario es con req.body
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("The user don't exist");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    //Enviar email
    resetPassword({
      email: usuario.email,
      name: usuario.name,
      token: usuario.token
    })

    res.json({ msg: "Check your email" });
  } catch (error) {
    console.log(error);
  }
}

const comprobarToken = async (req, res) => {
  const { token } = req.params; //para extraer valores de la url es con req.params
  const tokenValido = await Usuario.findOne({ token });

  if(tokenValido) {
    res.json({ msg: "Valid token"});
  } else {
    const error = new Error("Invalid token");
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
      return res.json({msg: "Password changed"})
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Invalid token");
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