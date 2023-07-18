import mongoose from "mongoose";


const churuataSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    descripcion:{
        type: String,
        require: true,
    },
    status:{
        type:Boolean,
        require:true
    }
});

// Exportar Churuata y el Modelo a la DB
const Churuata = mongoose.model('Churuata', churuataSchema);
export default Churuata;