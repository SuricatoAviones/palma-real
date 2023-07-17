import mongoose from "mongoose";


const deporteSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    descripcion:{
        type: String,
        require: true,
    }
});

// Exportar Deporte y el Modelo a la DB
const Deporte = mongoose.model('Deporte', deporteSchema);
export default Deporte;