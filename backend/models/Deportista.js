import mongoose from "mongoose";

const deportistaSchema = mongoose.Schema(
  {
    nombres: {
      type: String,
      required: true,
    },
    apellidos: {
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
    fecha_nacimiento: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    fecha_registro: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    status:{
      type: Boolean,
      required: true,
      default: true
    },
    deporte: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deporte",
    },
  },
  {
    timestamps: true,
  }
);

const Deportista = mongoose.model("Deportista", deportistaSchema);

export default Deportista;