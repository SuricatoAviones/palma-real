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
  .post(checkAuth, agregarDeporte)
  .get(checkAuth, obtenerDeportes);

router
  .route("/:id")
  .get(checkAuth, obtenerDeporte)
  .put(checkAuth, actualizarDeporte)
  .delete(checkAuth, eliminarDeporte);

export default router;
