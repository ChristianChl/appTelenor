import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";

export const validarJwt = (req: Request, res: Response, next: NextFunction  ) => {

    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        });
    }
    try {

        const {id_usuario, us_nombres}: any = jwt.verify(token, process.env.SECRET || 'EstOdeb3DeSERCompLic4d02080');

        req.body.id_usuario = id_usuario;
        req.body.us_nombres = us_nombres;
        
    } catch (error) {

        return res.status(401).json({
            ok:false,
            msg: 'token no válido'
        })
        
    }

    next();





}