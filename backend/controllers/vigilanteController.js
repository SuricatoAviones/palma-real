import Vigilante from "../models/Vigilante.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
  const { email, nombre } = req.body;

  // Prevenir usuarios duplicados
  const existeUsuario = await Vigilante.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Guardar un Nuevo Vigilante
    const vigilante = new Vigilante(req.body);
    const vigilanteGuardado = await vigilante.save();

    // Enviar el email
    emailRegistro({
      email,
      nombre,
      token: vigilanteGuardado.token,
    });

    res.json(vigilanteGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  const { vigilante } = req;
  res.json(vigilante);
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Vigilante.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Vigilante.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu Cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }
  // Revisar el password
  if (await usuario.comprobarPassword(password)) {
    // Autenticar
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.id),
    });
  } else {
    const error = new Error("El Password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeVigilante = await Vigilante.findOne({ email });
  if (!existeVigilante) {
    const error = new Error("El Usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeVigilante.token = generarId();
    await existeVigilante.save();

    // Enviar Email con instrucciones
    emailOlvidePassword({
      email,
      nombre: existeVigilante.nombre,
      token: existeVigilante.token,
    });

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Vigilante.findOne({ token });

  if (tokenValido) {
    // El TOken es válido el usuario existe
    res.json({ msg: "Token válido y el usuario existe" });
  } else {
    const error = new Error("Token no válido");
    return res.status(400).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const vigilante = await Vigilante.findOne({ token });
  if (!vigilante) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    vigilante.token = null;
    vigilante.password = password;
    await vigilante.save();
    res.json({ msg: "Password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const actualizarPerfil = async (req, res) => {
  const vigilante = await Vigilante.findById(req.params.id);
  if (!vigilante) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  const { email } = req.body;
  if (vigilante.email !== req.body.email) {
    const existeEmail = await Vigilante.findOne({ email });

    if (existeEmail) {
      const error = new Error("Ese email ya esta en uso");
      return res.status(400).json({ msg: error.message });
    }
  }

  try {
    vigilante.nombre = req.body.nombre;
    vigilante.email = req.body.email;
    vigilante.telefono = req.body.telefono;

    const vigilanteActualizado = await vigilante.save();
    res.json(vigilanteActualizado);
  } catch (error) {
    console.log(error);
  }
};

const actualizarPassword = async (req, res) => {
  // Leer los datos
  const { id } = req.veterinario;
  const { pwd_actual, pwd_nuevo } = req.body;

  // Comprobar que el veterinario existe
  const vigilante = await Vigilante.findById(id);
  if (!vigilante) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  // Comprobar su password
  if (await vigilante.comprobarPassword(pwd_actual)) {
    // Almacenar el nuevo password

    vigilante.password = pwd_nuevo;
    await vigilante.save();
    res.json({ msg: "Password Almacenado Correctamente" });
  } else {
    const error = new Error("El Password Actual es Incorrecto");
    return res.status(400).json({ msg: error.message });
  }
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword,
};