import mongoose from "mongoose";

const socioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
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
        default:null,
        trim:true
    },
    numero_socio: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Socio = mongoose.model("Socio", socioSchema);
export default Socio;
