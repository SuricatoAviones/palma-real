import express from "express";
const router = express.Router();
import {
  agregarAlquilerChuruata,
  obtenerAlquilerChuruatas,
  obtenerAlquilerChuruata,
  actualizarAlquilerChuruata,
  eliminarAlquilerChuruata,
} from "../controllers/alquilerChuruataController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
  .route("/")
  .post( agregarAlquilerChuruata)
  .get(obtenerAlquilerChuruatas);

router
  .route("/:id")
  .get(obtenerAlquilerChuruata)
  .put(actualizarAlquilerChuruata)
  .delete(eliminarAlquilerChuruata);

export default router;