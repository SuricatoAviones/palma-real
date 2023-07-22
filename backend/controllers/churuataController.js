import Churuata from "../models/Churuata.js";

const agregarChuruata = async (req, res) => {
    const churuata = new Churuata(req.body);
    
    try {
      const churuataAlmacenado = await churuata.save();
      res.json(churuataAlmacenado);
    } catch (error) {
      console.log(error);
    }
  };
  
  const obtenerChuruatas = async (req, res) => {
    const churuatas = await Churuata.find()
  
    res.json(churuatas);
  };
  
  const obtenerChuruata = async (req, res) => {
    const { id } = req.params;
    const churuata = await Churuata.findById(id);
  
    if (!churuata) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  
    
    res.json(churuata);
  };
  
  const actualizarChuruata = async (req, res) => {
    const { id } = req.params;
    const churuata = await Churuata.findById(id);
  
    if (!churuata) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  

  
    // Actualizar Churuata

    churuata.nombre = req.body.nombre || churuata.nombre;
    churuata.descripcion = req.body.descripcion || churuata.descripcion;

  
    try {
      const churuataActualizado = await deporte.save();
      res.json(churuataActualizado);
    } catch (error) {
      console.log(error);
    }
  };
  
  const eliminarChuruata = async (req, res) => {
    const { id } = req.params;
    const churuata = await Churuata.findById(id);
  
    if (!churuata) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  


    try {
      await churuata.deleteOne();
      res.json({ msg: "Churuata Eliminada" });
    } catch (error) {
      console.log(error);
    }
  };
  
  export {
    agregarChuruata,
    obtenerChuruatas,
    obtenerChuruata,
    actualizarChuruata,
    eliminarChuruata,
  };