import mongoose from "mongoose";

const deportistaSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now(),
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