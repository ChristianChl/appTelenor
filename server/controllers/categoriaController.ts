import { Request } from "express";
import { Response } from "express";
//import bcrypt from "bcrypt";
import Categoria from "../models/categoria";

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

        await categoria.update(body);
        res.json(categoria);
        //res.json(usuario);
        // res.json(token);

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