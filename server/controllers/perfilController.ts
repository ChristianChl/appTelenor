import { Request } from "express";
import { Response } from "express";
import Perfil from "../models/perfil";
import {Op} from 'sequelize';

export const getPerfiles  = async (req:Request, res:Response) =>{
    const perfil = await Perfil.findAll();

    res.json({perfil});

}

export const getPerfil =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const perfil = await Perfil.findByPk(id);

    if(perfil){
        
    res.json(perfil);
    }
    else{
        res.status(404).json({
            msg:`no existe perfil con el id ${id}`
        })
    }

}
export const postPerfil  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {

        const existePerfil = await Perfil.findOne({
            where: {
                perf_nombre: body.perf_nombre
            }
        });
        if (existePerfil) {
            return res.status(400).json({
                msg: 'Ya existe un perfil con el nombre ' + body.perf_nombre
            });
        }
        
        
        const perfil: any =  Perfil.build(body);

        await perfil.save();

        return res.status(201).json({
            ok:true,
            perfil

        });
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putPerfil  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const perfil = await Perfil.findByPk(id);
        if(!perfil){
            return res.status(404).json({
                msg: 'No existe perfil con el id ' + id
            });
        }

        const actualizarPerfil = await Perfil.findOne({
            where: {
                id_perfil: {
                    [Op.ne]: id
                },
                perf_nombre: body.perf_nombre
            }
        });
        if ( actualizarPerfil ) {
            return res.status(400).json({
                msg: 'Ya existe un perfil con el nombre ' + body.perf_nombre
            });
        }



        // await perfil.update(body);
        // res.json(perfil);

        await perfil.update(body);
        return res.status(201).json({
            ok: true,
            perfil
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deletePerfil  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const perfil = await Perfil.findByPk(id);
    if(!perfil){
        return res.status(404).json({
            msg: 'No existe el perfil con el id' + id
        })
    }

    await perfil.destroy();
    res.json(perfil);
}