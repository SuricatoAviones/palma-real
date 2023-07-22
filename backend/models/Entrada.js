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
        required: true,
        default: Date.now()
    },
    socio:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Socio",        
    }
    },
    {
        timestamps: true,
    }   
);

// Exportar Deporte y el Modelo a la DB
const Entrada = mongoose.model('Entrada', entradaSchema);
export default Entrada;