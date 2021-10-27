import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcrypt from "bcrypt";
import { generarJwt } from '../helpers/jwt';


export const loginUsuario = async (req: Request, res: Response) => {

    const { body } = req;
    try {

        const usuario: any = await Usuario.findOne({
            where: {
                us_login: body.us_login
            }
        });
        const usuarioInactivo: any = await Usuario.findOne({
            where: {
                us_login: body.us_login,
                us_activo: 1
            }
        });

        console.log(usuario);
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe: ' + body.us_login
            });

        }
        if (!usuarioInactivo) {
            return res.status(400).json({
                msg: 'El usuario se encuentra inactivo: ' + body.us_login
            });
        }

        const validPassword = bcrypt.compareSync(body.us_clave, usuario.us_clave);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            });
        }

        const token = await generarJwt ( usuario.id_usuario, usuario.us_nombres );

        // Respuesta del servicio

        return res.json({
            ok: true,
            uid: usuario.id_usuario,
            name: usuario.us_nombres,
            surnames: usuario.us_apellidos,
            avatar: usuario.avatar,
            email: usuario.us_email,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }

}

export const revalidarToken = async (req: Request, res: Response) => {

    const { body } = req;
  
    //Generar el JWT
    const usuario: any = await Usuario.findOne({
        where: {
            id_usuario: body.id_usuario,
        }
    });

    const token = await generarJwt(usuario.id_usuario, usuario.us_nombres);

    return res.json({
        ok: true,
        uid: usuario.id_usuario,
        name: usuario.us_nombres,
        surnames: usuario.us_apellidos,
        avatar: usuario.avatar,
        email: usuario.us_email,
        token
    });

}

