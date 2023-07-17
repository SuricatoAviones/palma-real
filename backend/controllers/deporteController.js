import Deporte from "../models/Deporte.js";

const agregarDeporte = async (req, res) => {
    const deporte = new Deporte(req.body);
    
    try {
      const deporteAlmacenado = await deporte.save();
      res.json(deporteAlmacenado);
    } catch (error) {
      console.log(error);
    }
  };
  
  const obtenerDeportes = async (req, res) => {
    const deportes = await Deporte.find()
  
    res.json(deportes);
  };
  
  const obtenerDeporte = async (req, res) => {
    const { id } = req.params;
    const deporte = await Deporte.findById(id);
  
    if (!deporte) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  
    
    res.json(deporte);
  };
  
  const actualizarDeporte = async (req, res) => {
    const { id } = req.params;
    const deporte = await Deporte.findById(id);
  
    if (!deporte) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  

  
    // Actualizar Deporte
    deporte.nombre = req.body.nombre || deporte.nombre;
    deporte.descripcion = req.body.descripcion || deporte.descripcion;

  
    try {
      const deporteActualizado = await deporte.save();
      res.json(deporteActualizado);
    } catch (error) {
      console.log(error);
    }
  };
  
  const eliminarDeporte = async (req, res) => {
    const { id } = req.params;
    const deporte = await Deporte.findById(id);
  
    if (!deporte) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  


    try {
      await deporte.deleteOne();
      res.json({ msg: "Deporte Eliminado" });
    } catch (error) {
      console.log(error);
    }
  };
  
  export {
    agregarDeporte,
    obtenerDeportes,
    obtenerDeporte,
    actualizarDeporte,
    eliminarDeporte,
  };