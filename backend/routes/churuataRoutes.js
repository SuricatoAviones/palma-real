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
  .post(checkAuth,agregarChuruata)
  .get(checkAuth,obtenerChuruatas);

router
  .route("/:id")
  .get(checkAuth,obtenerChuruata)
  .put(checkAuth,actualizarChuruata)
  .delete(checkAuth,eliminarChuruata);

export default router;
