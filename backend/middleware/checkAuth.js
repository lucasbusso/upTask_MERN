import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuarios.js';

const checkAuth = async (req, res, next) => {
//Custom middleware para proteger las rutas de la api
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);    
            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");

            return next();
        } catch (error) {
            return res.status(404).json({ msg: "An error has occurred"})
        }
    }

    if(!token) {
        const error = new Error("Invalid token");
        return res.status(401).json({ msg: error.message})
    }
    
    next();
};

export default checkAuth