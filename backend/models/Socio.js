import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

const socioSchema = mongoose.Schema(
  {
    nombres: {
      type: String,
      required: true     
    },
    apellidos: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      trim: true
    },
    password:{
        type: String,
        required: true,
    },
    telefono:{
        type: String,
        default: null,
        trim:true,
        unique: true
    },
    direccion:{
      type: String,
      default: null
      
    },
    cedula:{
      type: String,
      required: true,
      unique: true
    },
    status:{
      type: Boolean,
      required: true,
      default: true
    },
    numero_socio: {
      type: Number,
      required: true,
      trim: true,
      unique: true
    },
    fecha_pago:{
      type: Date,
      required: true,
      default: Date.now(),
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

  socioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
socioSchema.methods.comprobarPassword = async function (
    passwordFormulario
  ) {
    return await bcrypt.compare(passwordFormulario, this.password);
  };
  
  const Socio = mongoose.model("Socio", socioSchema);
  export default Socio;
