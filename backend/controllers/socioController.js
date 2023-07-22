import Socio from "../models/Socio.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
  const { email, nombre, cedula, numero_socio } = req.body;

  // Prevenir usuarios duplicados
  const existeUsuario = await Socio.findOne({ email, cedula, numero_socio });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado, chechar email, cedula o numero de socio.");
    return res.status(400).json({ msg: error.message });
  }

  try {
    // Guardar un Nuevo Socio
    const socio = new Socio(req.body);
    const socioGuardado = await socio.save();

    // Enviar el email
    emailRegistro({
      email,
      nombre,
      token: socioGuardado.token,
    });

    res.json(socioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  const { socio} = req;
  res.json(socio);
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Socio.findOne({ token });

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
  const usuario = await Socio.findOne({ email });
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

  const existeSocio = await Socio.findOne({ email });
  if (!existeSocio) {
    const error = new Error("El Usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeSocio.token = generarId();
    await existeSocio.save();

    // Enviar Email con instrucciones
    emailOlvidePassword({
      email,
      nombre: existeSocio.nombre,
      token: existeSocio.token,
    });

    res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Socio.findOne({ token });

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

  const socio = await Socio.findOne({ token });
  if (!socio) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  try {
    socio.token = null;
    socio.password = password;
    await socio.save();
    res.json({ msg: "Password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const actualizarPerfil = async (req, res) => {
  const socio = await Socio.findById(req.params.id);
  if (!socio) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  const { email, cedula, numero_socio } = req.body;
  if (socio.email !== req.body.email & socio.cedula !== req.body.cedula & socio.numero_socio !== req.body.numero_socio) {
    const existeEmail = await Socio.findOne({ email });
    const existeCedula = await Socio.findOne({ cedula });
    const existeNumeroSocio = await Socio.findOne({ numero_socio });

    if (existeEmail) {
      const error = new Error("Ese email ya esta en uso");
      return res.status(400).json({ msg: error.message });
    }
    if (existeCedula) {
        const error = new Error("Esta cedula ya esta en uso");
        return res.status(400).json({ msg: error.message });
    }
    if (existeNumeroSocio) {
        const error = new Error("Este numero de socio ya esta en uso");
        return res.status(400).json({ msg: error.message });
      }
  }

  try {
    socio.nombres = req.body.nombres;
    socio.apellidos = req.body.apellidos;
    socio.email = req.body.email;
    socio.telefono = req.body.telefono;
    socio.direccion = req.body.direccion;
    socio.cedula = req.body.cedula;
    socio.status = req.body.status;
    socio.numero_socio = req.body.numero_socio;
    socio.fecha_pago = req.body.fecha_pago;

    const socioActualizado = await socio.save();
    res.json(socioActualizado);
  } catch (error) {
    console.log(error);
  }
};

const actualizarPassword = async (req, res) => {
  // Leer los datos
  const { id } = req.socio;
  const { pwd_actual, pwd_nuevo } = req.body;

  // Comprobar que el socio existe
  const socio = await Socio.findById(id);
  if (!socio) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }

  // Comprobar su password
  if (await socio.comprobarPassword(pwd_actual)) {
    // Almacenar el nuevo password

    socio.password = pwd_nuevo;
    await socio.save();
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