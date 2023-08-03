import express from "express";
const router = express.Router();
import {
  agregarDeportista,
  obtenerDeportistas,
  obtenerDeportista,
  actualizarDeportista,
  eliminarDeportista,
} from "../controllers/deportistaController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(agregarDeportista)
  .get(obtenerDeportistas);

router
  .route("/:id")
  .get(obtenerDeportista)
  .put(actualizarDeportista)
  .delete(eliminarDeportista);

export default router;
