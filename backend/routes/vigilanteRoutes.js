import express from 'express';
const router = express.Router();

// Importando funciones desde el controlador
import {registrar,
     perfil, 
     confirmar, 
     autenticar, 
     olvidePassword, 
     comprobarToken, 
     nuevoPassword,
     actualizarPassword,
     actualizarPerfil,
     obtenerVigilante,
     obtenerVigilantes,
     eliminarVigilante} 
     from '../controllers/vigilanteController.js';
//Midleware
import checkAuth from '../middleware/authMiddleware.js';


// Area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('olvide-password', olvidePassword);

router.get('/',obtenerVigilantes);
router
     .route("/:id")
     .get(obtenerVigilante)
     .delete(eliminarVigilante);


router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

// Area privada
router.get('/perfil', perfil);
router.put("/perfil/:id",  actualizarPerfil);
router.put("/actualizar-password", actualizarPassword);


export default router;