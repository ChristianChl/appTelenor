import { Request } from "express";
import { Response } from "express";
import TipoPersona from "../models/tipoPersona";

export const getTiposPersonas  = async (req:Request, res:Response) =>{
    const tipoPersona = await TipoPersona.findAll();

    res.json({tipoPersona});

}

export const getTipoPersona =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const tipoPersona = await TipoPersona.findByPk(id);

    if(tipoPersona){
        
    res.json(tipoPersona);
    }
    else{
        res.status(404).json({
            msg:`no existe tipo persona con el id ${id}`
        })
    }

}
export const postTipoPersona  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        
        const tipoPersona: any =  TipoPersona.build(body);

        await tipoPersona.save();

        return res.status(201).json({
            ok:true,
            tipoPersona

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

export const putTipoPersona  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const tipoPersona = await TipoPersona.findByPk(id);
        if(!tipoPersona){
            return res.status(404).json({
                msg: 'No existe tipo persona con el id ' + id
            });
        }

        await tipoPersona.update(body);
        res.json(tipoPersona);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteTipoPersona  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const tipoPersona = await TipoPersona.findByPk(id);
    if(!tipoPersona){
        return res.status(404).json({
            msg: 'No existe el tipo Persona con el id' + id
        })
    }

    await tipoPersona.destroy();
    res.json(tipoPersona);
}