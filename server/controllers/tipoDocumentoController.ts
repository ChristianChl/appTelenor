import { Request } from "express";
import { Response } from "express";
import TiposDocumentos from "../models/tipoDocumento";

export const getTiposDocumentos  = async (req:Request, res:Response) =>{
    const tiposDocumentos = await TiposDocumentos.findAll();

    res.json({tiposDocumentos});

}

export const getTiposDocumento =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const tiposDocumentos = await TiposDocumentos.findByPk(id);

    if(tiposDocumentos){
        
    res.json(tiposDocumentos);
    }
    else{
        res.status(404).json({
            msg:`no existe tipo documento con el id ${id}`
        })
    }

}
export const postTiposDocumentos  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {

        const existeDocumento = await TiposDocumentos.findOne({
            where: {
                tipodoc_descripcion: body.tipodoc_descripcion
            }
        });
        if (existeDocumento) {
            return res.status(400).json({
                msg: 'Ya existe un tipo de documento con el nombre ' + body.tipodoc_descripcion
            });
        }
        
        
        const tiposDocumentos: any =  TiposDocumentos.build(body);

        await tiposDocumentos.save();

        return res.status(201).json({
            ok:true,
            tiposDocumentos

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

export const putTiposDocumentos  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const tiposDocumentos = await TiposDocumentos.findByPk(id);
        if(!tiposDocumentos){
            return res.status(404).json({
                msg: 'No existe tipo documento con el id ' + id
            });
        }

        await tiposDocumentos.update(body);
        res.json(tiposDocumentos);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteTiposDocumentos  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const tiposDocumentos = await TiposDocumentos.findByPk(id);
    if(!tiposDocumentos){
        return res.status(404).json({
            msg: 'No existe la tipo Documento con el id' + id
        })
    }

    await tiposDocumentos.destroy();
    res.json(tiposDocumentos);
}