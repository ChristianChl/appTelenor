import { Request } from "express";
import { Response } from "express";
import Persona from "../models/persona";
import Moneda from "../models/moneda"; "../models/moneda";
import Usuario from "../models/usuario";
import Venta from "../models/venta";

export const getVentas  = async (req:Request, res:Response) =>{
    const venta = await Venta.findAll({
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

    res.json({venta});

}

export const getVenta =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const venta = await Venta.findByPk(id, {
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

            }
        ]
    });

    if(venta){
        
    res.json(venta);
    }
    else{
        res.status(404).json({
            msg:`no existe una venta con el id ${id}`
        })
    }

}
export const postVenta  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        
        const venta: any =  Venta.build(body);

        await venta.save();

        return res.status(201).json({
            ok:true,
            venta

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

export const putVenta  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const venta = await Venta.findByPk(id);
        if(!venta){
            return res.status(404).json({
                msg: 'No existe una venta con el id ' + id
            });
        }

        await venta.update(body);
        res.json(venta);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteVenta  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const venta = await Venta.findByPk(id);
    if(!venta){
        return res.status(404).json({
            msg: 'No existe la venta con el id' + id
        })
    }

    await venta.destroy();
    res.json(venta);
}