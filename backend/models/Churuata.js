import mongoose from "mongoose";


const churuataSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
    },
    status:{
        type:Boolean,
        required:true,
        default: true,
    }
});

// Exportar Churuata y el Modelo a la DB
const Churuata = mongoose.model('Churuata', churuataSchema);
export default Churuata;