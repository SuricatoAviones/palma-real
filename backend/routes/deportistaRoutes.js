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
  .post(checkAuth,agregarDeportista)
  .get(checkAuth,obtenerDeportistas);

router
  .route("/:id")
  .get(checkAuth,obtenerDeportista)
  .put(checkAuth,actualizarDeportista)
  .delete(checkAuth,eliminarDeportista);

export default router;
