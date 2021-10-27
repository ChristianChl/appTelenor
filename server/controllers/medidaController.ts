import { Request } from "express";
import { Response } from "express";
import Medida from "../models/medida";
import {Op} from 'sequelize';

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
        
        const existeMedida = await Medida.findOne({
            where: {
                med_unidad: body.med_unidad.trim()
            }
        });
        if (existeMedida) {
            return res.status(400).json({
                msg: 'Ya existe una Unidad Medida con el nombre ' + body.med_unidad
            });
        }
        
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
        const actualizarMedida = await Medida.findOne({
            where: {
                id_medida: {
                    [Op.ne]: id
                },
                med_unidad: body.med_unidad.trim()
            }
        });
        if ( actualizarMedida ) {
            return res.status(400).json({
                msg: 'Ya existe una Unidad Medida con el nombre ' + body.med_unidad
            });
        }

        // await medida.update(body);
        // res.json(medida);

        await medida.update(body);

        return res.status(201).json({
            ok: true,
            medida
        });

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