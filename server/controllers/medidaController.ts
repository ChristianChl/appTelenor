import { Request } from "express";
import { Response } from "express";
import Medida from "../models/medida";

export const getMedidas  = async (req:Request, res:Response) =>{
    const medida = await Medida.findAll();

    res.json({medida});

}

export const getMedida =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const medida = await Medida.findByPk(id);

    if(medida){
        
    res.json(medida);
    }
    else{
        res.status(404).json({
            msg:`no existe medida con el id ${id}`
        })
    }

}
export const postMedida  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        
        const medida: any =  Medida.build(body);

        await medida.save();

        return res.status(201).json({
            ok:true,
            medida

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

export const putMedida  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const medida = await Medida.findByPk(id);
        if(!medida){
            return res.status(404).json({
                msg: 'No existe medida con el id ' + id
            });
        }

        await medida.update(body);
        res.json(medida);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteMedida  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const medida = await Medida.findByPk(id);
    if(!medida){
        return res.status(404).json({
            msg: 'No existe la medida con el id' + id
        })
    }

    await medida.destroy();
    res.json(medida);
}