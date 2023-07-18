import Deportista from "../models/Deportista.js";

const agregarDeportista = async (req, res) => {
  const deportista = new Deportista(req.body);
  deportista.deporte = req.deporte._id;
  try {
    const deportistaAlmacenado = await deportista.save();
    res.json(deportistaAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerDeportistas = async (req, res) => {
  const deportistas = await Deportista.find()
    .where("deporte")
    .equals(req.deporte);

  res.json(deportistas);
};

const obtenerDeportista = async (req, res) => {
  const { id } = req.params;
  const deportista = await Deportista.findById(id);

  if (!deportista) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (deportista.deporte._id.toString() !== req.deporte._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  res.json(deportista);
};

const actualizarDeportista = async (req, res) => {
  const { id } = req.params;
  const deportista = await Deportista.findById(id);

  if (!deportista) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (deportista.deporte._id.toString() !== req.deporte._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  // Actualizar Paciente
  deportista.nombre = req.body.nombre || deportista.nombre;


  try {
    const deportistaActualizado = await deportista.save();
    res.json(deportistaActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarDeportista = async (req, res) => {
  const { id } = req.params;
  const deportista = await Deportista.findById(id);

  if (!deportista) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  if (deportista.deporte._id.toString() !== req.deporte._id.toString()) {
    return res.json({ msg: "Accion no válida" });
  }

  try {
    await deportista.deleteOne();
    res.json({ msg: "Paciente Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarDeportista,
  obtenerDeportistas,
  obtenerDeportista,
  actualizarDeportista,
  eliminarDeportista,
};