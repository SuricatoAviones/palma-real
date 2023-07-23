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
  .post( checkAuth,agregarAlquilerChuruata)
  .get(checkAuth,obtenerAlquilerChuruatas);

router
  .route("/:id")
  .get(checkAuth,obtenerAlquilerChuruata)
  .put(checkAuth,actualizarAlquilerChuruata)
  .delete(checkAuth,eliminarAlquilerChuruata);

export default router;