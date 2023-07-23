
import jwt from 'jsonwebtoken';
import Administrador from '../models/Administrador.js';

const checkAuth = async (req, res, next) =>{
    let token;
    console.log(req.headers.authorization);
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try {
            
            token = req.headers.authorization.split(' ')[1] || req.headers.authorization
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.administrador  = await Administrador.findById(decoded.id).select("-password -token -confirmado");
            return next();
        } catch (error) {
            const e = new Error(' Token no valido o inexistente');
            return res.status(403).json({msg: e.message });  
        }
        
    }
    else {
        console.log('no hay')
    }

    if(!token){
        const error = new Error(' Token no valido o inexistente');
        res.status(403).json({msg: error.message });
    }
    next();
};


export default checkAuth;