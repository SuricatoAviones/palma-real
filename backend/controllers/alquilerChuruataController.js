import AlquilerChuruata from "../models/AlquilerChuruata.js";

const agregarAlquilerChuruata = async (req, res) => {
    const alquilerChuruata = new AlquilerChuruata(req.body);
    
    try {
      const alquilerAlmacenado = await alquilerChuruata.save();
      res.json(alquilerAlmacenado);
    } catch (error) {
      console.log(error);
    }
  };
  
  const obtenerAlquilerChuruatas = async (req, res) => {
    const alquileres = await AlquilerChuruata.find()
  
    res.json(alquileres);
  };
  
  const obtenerAlquilerChuruata = async (req, res) => {
    const { id } = req.params;
    const alquiler = await AlquilerChuruata.findById(id);
  
    if (!alquiler) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  
    
    res.json(local);
  };
  
  const actualizarAlquilerChuruata = async (req, res) => {
    const { id } = req.params;
    const alquiler = await AlquilerChuruata.findById(id);
  
    if (!alquiler) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  

  
    // Actualizar el Aquiler
    alquiler.nombres = req.body.nombres || alquiler.nombres;
    alquiler.apellidos = req.body.apellidos || alquiler.apellidos;
    alquiler.cedula = req.body.cedula || alquiler.cedula;
    alquiler.descripcion_evento = req.body.descripcion_evento || alquiler.descripcion_evento;
    alquiler.telefono = req.body.telefono || alquiler.telefono;
    alquiler.email = req.body.email || alquiler.email;
    alquiler.fecha_evento = req.body.fecha_evento || alquiler.fecha_evento;

  
    try {
      const alquilerChuruataActualizado = await alquilerChuruata.save();
      res.json(alquilerChuruataActualizado);
    } catch (error) {
      console.log(error);
    }
  };
  
  const eliminarAlquilerChuruata = async (req, res) => {
    const { id } = req.params;
    const alquiler = await AlquilerChuruata.findById(id);
  
    if (!alquiler) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  


    try {
      await alquiler.deleteOne();
      res.json({ msg: "Local Eliminado" });
    } catch (error) {
      console.log(error);
    }
  };
  
  export {
    agregarAlquilerChuruata,
    obtenerAlquilerChuruata,
    obtenerAlquilerChuruatas,
    actualizarAlquilerChuruata,
    eliminarAlquilerChuruata,
  };