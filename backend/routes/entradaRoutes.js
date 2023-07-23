import express from "express";
const router = express.Router();
import {
  agregarEntrada,
  obtenerEntradas,
  obtenerEntrada,
  actualizarEntrada,
  eliminarEntrada,
} from "../controllers/entradaController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(agregarEntrada)
  .get(checkAuth,obtenerEntradas);

router
  .route("/:id")
  .get(checkAuth,obtenerEntrada)
  .put(checkAuth,actualizarEntrada)
  .delete(checkAuth,eliminarEntrada);

export default router;