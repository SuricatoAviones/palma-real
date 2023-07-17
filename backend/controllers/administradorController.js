import Administrador from "../models/Administrador.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";


const registrar = async (req,res)=>{
    const {email, nombre} = req.body;
    //Prevenir usuarios registrados

    const  existeUsuario = await Administrador.findOne({
        email
    });

    if(existeUsuario){
        const error = new Error ('Usuario ya registrado');
        return res.status(400).json({msg: error.message});
    }



    try {
        // Guardar un nuevo veterinario

        const administrador = new Administrador(req.body);
        const administradorGuardado = await administrador.save();

        //Enviar el email
        emailRegistro({email, nombre, token: tokenGuardado.token});


        res.json(administradorGuardado)



    } catch (error) {
        console.log(error);
    }

};

const perfil = (req, res) => {
    const { administrador } = req;
    res.json(administrador);
};

const confirmar = async (req, res) =>{
    const {token} = req.params;
    const usuarioConfirmar = await Administrador.findOne({token});
    
    if(!usuarioConfirmar){
        const error = new Error(' Token no valido');

        return res.status(404).json({msg: error.message});
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmar = true;
        await usuarioConfirmar.save();
        res.json({msg: "Usuario Confrimado"});
    } catch (error) {
        console.log(error);
    }

    res.send({msg:'mostratr perfil'})
};

const autenticar = async (req,res) =>{

    const {email, password} = req.body

    // Comprobar si el usuario existe
    const usuario = await Administrador.findOne({email})

    if(!usuario){
        const error = new Error('El usuario no existe');

        return res.status(404).json({msg: error.message});
    }

    // Comprobar si el usuario esta confirmado

    if (!usuario.confirmado) {
        const error = new Error ('Tu cuenta no ha sido confirmado');
        return res.status(404).json({msg: error.message});
    }

    // Revisar el password
    if(await usuario.comprobarPassword(password)) {
        res.json({token:generarJWT(usuario.id)})
    }
    else{
        const error = new Error ('Password Incorrecto');
        return res.status(404).json({msg: error.message});
    }

};

const olvidePassword = async (req,res ) =>{
    const { email } = req.body;
    const existeAdministrador = await Administrador.findOne({email});
    if(!existeAdministrador){
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }
    try {
        existeAdministrador.token = generarId()
        await existeAdministrador.save()
        res.json({msg: 'Hemos enviado un email'})
    } catch (error) {
        
    }
}
const comprobarToken = async (req,res ) =>{
    const {token} = req.params;
    const tokenValido = await Administrador.findOne({token});

    if(tokenValido){
        // El token es valido el usuario existe
    } else{
        const error = new Error('Token no es valido');
        return res.status(400).json({msg: error.message});
    }
}
const nuevoPassword = async (req,res ) =>{
    const {token} = req.params;
    const { password} = req.body;
    const administrador = await Administrador.findOne({token});
    if(!administrador){
        const error = new Error('Hubo un error');
        return res.status(400).json({msg: error.message});

    }

    try {
        administrador.token = null;
        administrador.password = password;
        await administrador.save();
        console.log(error)
    } catch (error) {
        
    }
}

export {registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword};