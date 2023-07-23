import  express  from 'express';
import  dotenv  from 'dotenv';
import cors from "cors";
import conectarDB from "./config/db.js";

//Importacion de Rutas
import administradorRoutes from './routes/administradorRoutes.js';
import deporteRoutes from './routes/deporteRoutes.js'
import deportistaRoutes from './routes/deportistaRoutes.js'
import churuataRoutes from './routes/churuataRoutes.js'
import localRoutes from './routes/localRoutes.js'
import socioRoutes from './routes/socioRoutes.js'
import vigilanteRoutes from './routes/vigilanteRoutes.js'
import alquilerChuruataRoutes from './routes/alquilerChuruataRoutes.js'
import entradaRoutes from './routes/entradaRoutes.js'

const app = express();

// Se envia los datos en .Json
app.use(express.json()); 

// Conectar la DB
dotenv.config();
conectarDB();

// CORS
/* const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // El Origen del Request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

app.use(cors(corsOptions)); */

// Routes
app.use('/api/administradores', administradorRoutes)
app.use('/api/deportes', deporteRoutes)
app.use('/api/deportes/deportistas', deportistaRoutes)
app.use('/api/churuatas', churuataRoutes)
app.use('/api/locales', localRoutes)
app.use('/api/socios', socioRoutes)
app.use('/api/vigilantes',vigilanteRoutes)
app.use('/api/alquiler-churuatas',alquilerChuruataRoutes)
app.use('/api/entradas',entradaRoutes)


// Puerto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
  });
  