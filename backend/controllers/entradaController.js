import Entrada from "../models/Entrada.js";

const agregarEntrada = async (req, res) => {
  const entrada = new Entrada(req.body);
  entrada.socio = req.body.socio;
  try {
    const entradaAlmacenado = await entrada.save();
    res.json(entradaAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerEntradas = async (req, res) => {
  const entradas = await Entrada.find()
    .where("socio")
    .equals(req.body.socio);

  res.json(entradas);
};

const obtenerEntrada = async (req, res) => {
  const { id } = req.params;
  const entrada = await Entrada.findById(id);

  if (!entrada) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (entrada.socio._id.toString() !== req.socio._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  res.json(entrada);
};

const actualizarEntrada = async (req, res) => {
  const { id } = req.params;
  const entrada = await Entrada.findById(id);

  if (!entrada) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (entrada.socio._id.toString() !== req.socio._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  // Actualizar Paciente
  entrada.nombres = req.body.nombres || entrada.nombres;
  entrada.apellidos = req.body.apellidos || entrada.apellidos;
  entrada.cedula = req.body.cedula || entrada.cedula;
  entrada.fecha = req.body.fecha || entrada.fecha;
  entrada.status = req.body.status || entrada.status;

  try {
    const entradaActualizado = await entrada.save();
    res.json(entradaActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarEntrada = async (req, res) => {
  const { id } = req.params;
  const entrada = await Entrada.findById(id);

  if (!entrada) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (entrada.socio._id.toString() !== req.socio._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  try {
    await entrada.deleteOne();
    res.json({ msg: "Entrada Eliminada" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarEntrada,
  obtenerEntradas,
  obtenerEntrada,
  actualizarEntrada,
  eliminarEntrada,
};