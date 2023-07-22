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
  .post( agregarLocal)
  .get( obtenerLocales);

router
  .route("/:id")
  .get(obtenerLocal)
  .put( actualizarLocal)
  .delete( eliminarLocal);

export default router;
