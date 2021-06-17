import { Request } from "express";
import { Response } from "express";
import Permiso from "../models/permiso";

export const getPermisos  = async (req:Request, res:Response) =>{
    const permiso = await Permiso.findAll();

    res.json({permiso});

}

export const getPermiso =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const permiso = await Permiso.findByPk(id);

    if(permiso){
        
    res.json(permiso);
    }
    else{
        res.status(404).json({
            msg:`no existe un permiso con el id ${id}`
        })
    }

}
export const postPermiso  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        
        const permiso: any =  Permiso.build(body);

        await permiso.save();

        return res.status(201).json({
            ok:true,
            permiso

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putPermiso  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const permiso = await Permiso.findByPk(id);
        if(!permiso){
            return res.status(404).json({
                msg: 'No existe el permiso con el id ' + id
            });
        }

        await permiso.update(body);
        res.json(permiso);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deletePermiso  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const permiso = await Permiso.findByPk(id);
    if(!permiso){
        return res.status(404).json({
            msg: 'No existe el permiso con el id' + id
        })
    }

    await permiso.destroy();
    res.json(permiso);
}