import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

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
    token: {
        type: String,
        default: generarId()
    },
    confirmado:{
        type: Boolean,
        default: false
    },
});

administradorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
administradorSchema.methods.comprobarPassword = async function (
    passwordFormulario
  ) {
    return await bcrypt.compare(passwordFormulario, this.password);
  };
  
  const Administrador = mongoose.model("Administrador", administradorSchema);
  export default Administrador;