import mongoose from 'mongoose';


// Funcion para Conectar la base de Datos
const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);

        const url = `${db.connection.host}:${db.connection.host}`
        console.log(`MongoDB conectado en: ${url}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);

    }
 }
 export default conectarDB;