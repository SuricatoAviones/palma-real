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
  .get(obtenerEntradas);

router
  .route("/:id")
  .get(obtenerEntrada)
  .put(actualizarEntrada)
  .delete(eliminarEntrada);

export default router;