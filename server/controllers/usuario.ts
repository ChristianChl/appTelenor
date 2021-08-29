import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcrypt from "bcrypt";
import { generarJwt } from '../helpers/jwt';
import Perfil from '../models/perfil';
import TipoDocumento from "../models/tipoDocumento";
import {Op} from 'sequelize';

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll({
        // where:{

        //     us_eliminado: false
        // },
        
        include:[
            {
                model: Perfil,
                as: 'Perfils',
                attributes: ["id_perfil", "perf_nombre", "perf_descripcion"],
            },
            {
                model: TipoDocumento,
                as: 'TipoDocumentos',
                attributes: ["id_tipoDocumento", "tipodoc_descripcion"],

            }
        ]
        
    });
    res.json({ usuarios });

}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
        include:[
            {
                model: Perfil,
                as: 'Perfils',
                attributes: ["id_perfil", "perf_nombre", "perf_descripcion"],
            },
            {
                model: TipoDocumento,
                as: 'TipoDocumentos',
                attributes: ["id_tipoDocumento", "tipodoc_descripcion"],

            }
        ]
    });

    if (usuario) {

        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }

}

export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    try {

        const existeLogin = await Usuario.findOne({
            where: {
                us_login: body.us_login
            }
        });
        if (existeLogin) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el login ' + body.us_login
            });
        }
        // const usuario =  Usuario.build(body);
    
        const salt = bcrypt.genSaltSync(10);

        body.us_clave = bcrypt.hashSync(body.us_clave, salt);

        const usuario: any = Usuario.build(body);

        await usuario.save();

        const token = await generarJwt(usuario.id_usuario, usuario.us_nombres);

        return res.status(201).json({
            ok: true,
            usuario,
            token
        });
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }

}

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        const actualizarLogin = await Usuario.findOne({
            where: {
                id_usuario: {
                    [Op.ne]: id
                },
                us_login: body.us_login
            }
        });
        if ( actualizarLogin ) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el login ' + body.us_login
            });
        }

        const actualizaClave = await Usuario.findOne({
            where: {
                // us_login: body.us_login,
                us_clave: body.us_clave
            }
        });
        if (!actualizaClave) {
            
            const salt = bcrypt.genSaltSync(10);
            body.us_clave = bcrypt.hashSync(body.us_clave, salt);
        }

        // await usuario.update(body);
        // res.json(usuario);

        await usuario.update(body);

        return res.status(201).json({
            ok: true,
            usuario
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }

}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    await usuario.destroy();
    // await usuario.update({us_eliminado: true});

    res.json('el usuario ha sido borrado');
}
