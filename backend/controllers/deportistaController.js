import Deportista from "../models/Deportista.js";


const agregarDeportista = async (req, res) => {
  const deportista = new Deportista(req.body);
  deportista.deporte = req.body.deporte;
  
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
    .equals(req.body.deporte);

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
  deportista.nombreS = req.body.nombres || deportista.nombres;
  deportista.apellidos = req.body.apellidos || deportista.apellidos
  deportista.email = req.body.email || deportista.email;
  deportista.telefono = req.body.telefono || deportista.telefono;


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
    res.json({ msg: "Deportista Eliminado" });
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