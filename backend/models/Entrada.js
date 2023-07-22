import mongoose from "mongoose";

const entradaSchema = mongoose.Schema({
    nombres:{
        type: String,
        required: true
    },
    apellidos:{
        type: String,
        required: true
    },
    cedula:{
        type: String,
        require: true,
        trim: true
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    },
    fecha:{
        type: Date,
        required: true
    }
});

// Exportar Deporte y el Modelo a la DB
const Entrada = mongoose.model('Local', entradaSchema);
export default Entrada;