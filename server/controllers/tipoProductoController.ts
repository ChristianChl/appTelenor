import { Request } from "express";
import { Response } from "express";
import TipoProducto from "../models/tipoProducto";

export const getTiposProductos  = async (req:Request, res:Response) =>{
    const tipoProducto = await TipoProducto.findAll();

    res.json({tipoProducto});

}

export const getTipoProducto =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const tipoProducto = await TipoProducto.findByPk(id);

    if(tipoProducto){
        
    res.json(tipoProducto);
    }
    else{
        res.status(404).json({
            msg:`no existe un tipo de producto con el id ${id}`
        })
    }

}
export const postTipoProducto  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        
        const tipoProducto: any =  TipoProducto.build(body);

        await tipoProducto.save();

        return res.status(201).json({
            ok:true,
            tipoProducto

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

export const putTipoProducto  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const tipoProducto = await TipoProducto.findByPk(id);
        if(!tipoProducto){
            return res.status(404).json({
                msg: 'No existe el tipo de producto con el id ' + id
            });
        }

        await tipoProducto.update(body);
        res.json(tipoProducto);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteTipoProducto  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const tipoProducto = await TipoProducto.findByPk(id);
    if(!tipoProducto){
        return res.status(404).json({
            msg: 'No existe el tipo producto con el id' + id
        })
    }

    await tipoProducto.destroy();
    res.json(tipoProducto);
}