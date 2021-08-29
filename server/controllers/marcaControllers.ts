import { Request } from "express";
import { Response } from "express";
//import bcrypt from "bcrypt";
import bcrypt from "bcrypt";
import { generarJwt } from '../helpers/jwt';
import Marca from "../models/marca";
import {Op} from 'sequelize';

export const getMarcas  = async (req:Request, res:Response) =>{
    const marca = await Marca.findAll();

    res.json({marca});

}

export const getMarca =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const marca = await Marca.findByPk(id);

    if(marca){
        
    res.json(marca);
    }
    else{
        res.status(404).json({
            msg:`no existe marca con el id ${id}`
        })
    }

}
export const postMarca  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        const existeMarca = await Marca.findOne({
            where: {
                mar_nombre: body.mar_nombre
            }
        });
        if (existeMarca) {
            return res.status(400).json({
                msg: 'Ya existe una Marca con el nombre ' + body.mar_nombre
            });
        }
        
        const marca: any =  Marca.build(body);

        await marca.save();

        return res.status(201).json({
            ok:true,
            marca

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

export const putMarca  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const marca = await Marca.findByPk(id);
        if(!marca){
            return res.status(404).json({
                msg: 'No existe marca con el id ' + id
            });
        }

        const actualizarMarca = await Marca.findOne({
            where: {
                id_marca: {
                    [Op.ne]: id
                },
                mar_nombre: body.mar_nombre
            }
        });
        if ( actualizarMarca ) {
            return res.status(400).json({
                msg: 'Ya existe una Marca con el nombre ' + body.mar_nombre
            });
        }

        // await marca.update(body);
        // res.json(marca);

        await marca.update(body);

        return res.status(201).json({
            ok: true,
            marca
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteMarca  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const marca = await Marca.findByPk(id);
    if(!marca){
        return res.status(404).json({
            msg: 'No existe la marca con el id' + id
        })
    }

    await marca.destroy();
    res.json(marca);
}