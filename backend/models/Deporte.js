import mongoose from "mongoose";


const deporteSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
    }
});

// Exportar Deporte y el Modelo a la DB
const Deporte = mongoose.model('Deporte', deporteSchema);
export default Deporte;