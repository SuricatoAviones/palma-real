import express from "express";
const router = express.Router();
import {
  agregarDeporte,
  obtenerDeportes,
  obtenerDeporte,
  actualizarDeporte,
  eliminarDeporte,
} from "../controllers/deporteController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(agregarDeporte)
  .get(obtenerDeportes);

router
  .route("/:id")
  .get(obtenerDeporte)
  .put(actualizarDeporte)
  .delete(eliminarDeporte);

export default router;
