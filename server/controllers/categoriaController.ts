import { Request } from "express";
import { Response } from "express";
//import bcrypt from "bcrypt";
import Categoria from "../models/categoria";
import {Op} from 'sequelize';

export const getCategorias  = async (req:Request, res:Response) =>{
    const categoria = await Categoria.findAll();

    res.json({categoria});

}

export const getCategoria =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const categoria = await Categoria.findByPk(id);

    if(categoria){
        
    res.json(categoria);
    }
    else{
        res.status(404).json({
            msg:`no existe categoria con el id ${id}`
        })
    }

}
export const postCategoria = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        const existeCategoria = await Categoria.findOne({
            where: {
                cat_nombre: body.cat_nombre
            }
        });
        if (existeCategoria) {
            return res.status(400).json({
                msg: 'Ya existe una Categoria con el nombre ' + body.cat_nombre
            });
        }
        
        const categoria: any =  Categoria.build(body);

        await categoria.save();

        return res.status(201).json({
            ok:true,
            categoria

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

export const putCategoria  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        


        const categoria = await Categoria.findByPk(id);
        if(!categoria){
            return res.status(404).json({
                msg: 'No existe categoria con el id ' + id
            });
        }

        const actualizarCategoria = await Categoria.findOne({
            where: {
                id_categoria: {
                    [Op.ne]: id
                },
                cat_nombre: body.cat_nombre
            }
        });
        if ( actualizarCategoria ) {
            return res.status(400).json({
                msg: 'Ya existe una Categoria con el nombre ' + body.cat_nombre
            });
        }

        // await categoria.update(body);
        // res.json(categoria);

        await categoria.update(body);

        return res.status(201).json({
            ok: true,
            categoria
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteCategoria  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const categoria = await Categoria.findByPk(id);
    if(!categoria){
        return res.status(404).json({
            msg: 'No existe categoria con el id' + id
        })
    }

    await categoria.destroy();
    res.json(categoria);
}