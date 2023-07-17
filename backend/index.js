import  express  from 'express';
import  dotenv  from 'dotenv';
import cors from "cors";
import conectarDB from "./config/db.js";

//Importacion de Rutas
import administradorRoutes from './routes/administradorRoutes.js';
import deporteRoutes from './routes/deporteRoutes.js'
import localRoutes from './routes/localRoutes.js'

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
app.use('/api/locales', localRoutes)

// Puerto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
  });
  