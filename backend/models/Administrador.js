import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js'

const administradorSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        required: true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    telefono:{
        type: String,
        default:null,
        trim:true
    },
    web:{
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado:{
        type: Boolean,
        default: false
    },
});

// Modificar contraseña  y Hashearla
administradorSchema.pre('save',() => async function(next){
    if (!this.isModified('password')) {
        next();
    }
    
    const salt = await bcrypt.getSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

administradorSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password)
}


// Exportar Administrador y el Modelo a la DB
const Administrador = mongoose.model('Administrador', administradorSchema);
export default Administrador;