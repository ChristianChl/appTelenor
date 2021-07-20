import { Request } from "express";
import { Response } from "express";
import Persona from "../models/persona";
import Moneda from "../models/moneda"; "../models/moneda";
import Usuario from "../models/usuario";
import Cotizacion from "../models/cotizacion"; "../models/cotizacion";

export const getCotizaciones  = async (req:Request, res:Response) =>{
    const cotizacion = await Cotizacion.findAll({
        include:[
            {
                model: Persona,
                as: 'Personas',
                attributes: ["id_Persona", "per_razonSocial", "per_numeroDocumento", "per_direccion", "per_celular", "per_telefonoFijo", "per_email", "fk_id_tipoDocumento", "fk_id_tipoPersona"],
            },
            {
                model: Usuario,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"],

            },
            {
                model: Moneda,
                as: 'Monedas',
                attributes: ["id_moneda", "mon_nombre", "mon_tipoCambio"],
            }
        ]
    });

    res.json({cotizacion});

}

export const getCotizacion =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const cotizacion = await Cotizacion.findByPk(id, {
        include:[
            {
                model: Persona,
                as: 'Personas',
                attributes: ["id_Persona", "per_razonSocial", "per_numeroDocumento", "per_direccion", "per_celular", "per_telefonoFijo", "per_email", "fk_id_tipoDocumento", "fk_id_tipoPersona"],
            },
            {
                model: Usuario,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"],
            },
            {
                model: Moneda,
                as: 'Monedas',
                attributes: ["id_moneda", "mon_nombre", "mon_tipoCambio"],
            }
        ]
    });

    if(cotizacion){
        
    res.json(cotizacion);
    }
    else{
        res.status(404).json({
            msg:`no existe una cotizacion con el id ${id}`
        })
    }

}
export const postCotizacion  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        
        const cotizacion: any =  Cotizacion.build(body);

        await cotizacion.save();

        return res.status(201).json({
            ok:true,
            cotizacion

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

export const putCotizacion  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const cotizacion = await Cotizacion.findByPk(id);
        if(!cotizacion){
            return res.status(404).json({
                msg: 'No existe una cotizacion con el id ' + id
            });
        }

        await cotizacion.update(body);
        res.json(cotizacion);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteCotizacion  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const cotizacion = await Cotizacion.findByPk(id);
    if(!cotizacion){
        return res.status(404).json({
            msg: 'No existe la cotizacion con el id' + id
        })
    }

    await cotizacion.destroy();
    res.json(cotizacion);
}