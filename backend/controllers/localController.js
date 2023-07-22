import Local from "../models/Local.js";

const agregarLocal = async (req, res) => {
    const local = new Local(req.body);
    
    try {
      const localAlmacenado = await local.save();
      res.json(localAlmacenado);
    } catch (error) {
      console.log(error);
    }
  };
  
  const obtenerLocales = async (req, res) => {
    const locales = await Local.find()
  
    res.json(locales);
  };
  
  const obtenerLocal = async (req, res) => {
    const { id } = req.params;
    const local = await Local.findById(id);
  
    if (!local) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  
    
    res.json(local);
  };
  
  const actualizarLocal = async (req, res) => {
    const { id } = req.params;
    const local = await Local.findById(id);
  
    if (!local) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  

  
    // Actualizar Local
    local.nombre = req.body.nombre || local.nombre;
    local.descripcion = req.body.descripcion || local.descripcion;
    local.rif = req.body.rif || local.rif;
    local.status = req.body.status || local.status;
    local.fecha_pago = req.body.fecha_pago || local.fecha_pago;

  
    try {
      const localActualizado = await local.save();
      res.json(localActualizado);
    } catch (error) {
      console.log(error);
    }
  };
  
  const eliminarLocal = async (req, res) => {
    const { id } = req.params;
    const local = await Local.findById(id);
  
    if (!local) {
      return res.status(404).json({ msg: "No Encontrado" });
    }
  


    try {
      await local.deleteOne();
      res.json({ msg: "Local Eliminado" });
    } catch (error) {
      console.log(error);
    }
  };
  
  export {
    agregarLocal,
    obtenerLocales,
    obtenerLocal,
    actualizarLocal,
    eliminarLocal,
  };