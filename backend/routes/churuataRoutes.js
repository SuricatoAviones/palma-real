import express from "express";
const router = express.Router();
import {
  agregarChuruata,
  obtenerChuruatas,
  obtenerChuruata,
  actualizarChuruata,
  eliminarChuruata,
} from "../controllers/churuataController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(agregarChuruata)
  .get(obtenerChuruatas);

router
  .route("/:id")
  .get(obtenerChuruata)
  .put(actualizarChuruata)
  .delete(eliminarChuruata);

export default router;
