import mongoose from "mongoose";

const entradaSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    apellido:{
        type: String,
        require: true
    },
    cedula:{
        type: Number,
        require: true
    },
    status:{
        type: Boolean,
        require: true
    },
    fecha:{
        type: Date,
        require: true
    }
});

// Exportar Deporte y el Modelo a la DB
const Entrada = mongoose.model('Local', entradaSchema);
export default Entrada;