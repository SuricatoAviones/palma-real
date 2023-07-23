import express from "express";
const router = express.Router();
import {
  agregarLocal,
  obtenerLocales,
  obtenerLocal,
  actualizarLocal,
  eliminarLocal,
} from "../controllers/localController.js";
import checkAuth from "../middleware/authMiddleware.js";

router
  .route("/")
  .post( checkAuth,agregarLocal)
  .get( checkAuth,obtenerLocales);

router
  .route("/:id")
  .get(checkAuth ,obtenerLocal)
  .put( checkAuth,actualizarLocal)
  .delete( checkAuth,eliminarLocal);

export default router;
