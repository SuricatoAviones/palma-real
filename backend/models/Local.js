import mongoose from "mongoose";


const localSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    descripcion:{
        type: String,
        require: true
    },
    status:{
        type: Boolean,
        require: true
    },
    fechaDeVencimiento:{
        type: Date,
        require: true
    }
});

// Exportar Deporte y el Modelo a la DB
const Local = mongoose.model('Local', localSchema);
export default Local;