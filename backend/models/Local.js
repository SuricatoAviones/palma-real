import mongoose from "mongoose";


const localSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    rif:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    },
    fecha_pago:{
        type: Date,
        required: true,
        default: Date.now()
    }
});

// Exportar Deporte y el Modelo a la DB
const Local = mongoose.model('Local', localSchema);
export default Local;