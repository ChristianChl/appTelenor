import { Request } from "express";
import { Response } from "express";
import Persona from "../models/persona";
import TipoDocumento from "../models/tipoDocumento";
import TipoPersona from "../models/tipoPersona";
import {Op} from 'sequelize';

export const getPersonas  = async (req:Request, res:Response) =>{
    const persona = await Persona.findAll({
        include: [
            {
                model: TipoPersona,
                as: 'TipoPersonas',
                attributes: ["id_tipoPersona", "tipoper_descripcion"],
            },
            {
                model: TipoDocumento,
                as: 'TipoDocumentos',
                attributes: ["id_tipoDocumento", "tipodoc_descripcion"],

            }
        ]
    });

    res.json({persona});

}

export const getPersona =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const persona = await Persona.findByPk(id, {
        include: [
            {
                model: TipoPersona,
                as: 'TipoPersonas',
                attributes: ["id_tipoPersona", "tipoper_descripcion"],
            },
            {
                model: TipoDocumento,
                as: 'TipoDocumentos',
                attributes: ["id_tipoDocumento", "tipodoc_descripcion"],

            }
        ]
    });

    if(persona){
        
    res.json(persona);
    }
    else{
        res.status(404).json({
            msg:`no existe persona con el id ${id}`
        })
    }

}
export const postPersona  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {

        const existePersona = await Persona.findOne({
            where: {
                fk_id_tipoPersona: {
                    [Op.eq]: body.fk_id_tipoPersona
                },
                per_razonSocial: body.per_razonSocial.trim()
            }
        });
        if (existePersona) {
            return res.status(400).json({
                msg: 'Ya existe una Persona con el nombre ' + body.per_razonSocial
            });
        }
        
        const persona: any =  Persona.build(body);

        await persona.save();

        return res.status(201).json({
            ok:true,
            persona

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

export const putPersona  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const persona = await Persona.findByPk(id);
        if(!persona){
            return res.status(404).json({
                msg: 'No existe persona con el id ' + id
            });
        }
        const actualizarPersona = await Persona.findOne({
            where: {
                fk_id_tipoPersona: {
                    [Op.eq]: body.fk_id_tipoPersona
                },
                id_Persona: {
                    [Op.ne]: id
                },
                per_razonSocial: body.per_razonSocial.trim()
            }
        });
        if (actualizarPersona) {
            return res.status(400).json({
                msg: 'Ya existe una Persona con el nombre ' + body.per_razonSocial
            });
        }

        await persona.update(body);

        return res.status(201).json({
            ok:true,
            persona
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

export const deletePersona  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const persona = await Persona.findByPk(id);
    if(!persona){
        return res.status(404).json({
            msg: 'No existe la persona con el id' + id
        })
    }

    await persona.destroy();
    res.json(persona);
}