import mongoose from "mongoose";


const AlquilerChuruataSchema = mongoose.Schema({
    nombres:{
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    descripcion_evento:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    cedula:{
        type: String,
        required: true,
        unique: true
    },
    telefono:{
        type: String,
        default:null,
        trim:true
      },
    fecha_evento: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

// Exportar el Alquiler y el Modelo a la DB
const AlquilerChuruata = mongoose.model('AlquilerChuruata', AlquilerChuruataSchema);
export default AlquilerChuruata;