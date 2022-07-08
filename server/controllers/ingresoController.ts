import { Request } from "express";
import { Response } from "express";
import Ingreso from "../models/ingreso";
import Persona from "../models/persona";
import Usuario from "../models/usuario";
import {Op, or} from 'sequelize';

export const getIngresos  = async (req:Request, res:Response) =>{
    const ingreso = await Ingreso.findAll({
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

    res.json({ingreso});

}

// metodo para buscar por rango de fecha

export const getIngresosByDates  = async (req:Request, res:Response) =>{
    const{body} = req;
    const ingreso = await Ingreso.findAll({
        where: {
            createdAt: {
                [Op.between]: [body.createdAt, body.ing_fechaHora]
            }
        },
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

    res.json({ingreso});

}

//Metodo para buscar por numero comprobante

export const getIngresosForDocuments  = async (req:Request, res:Response) =>{
    const{body} = req;
    const ingreso = await Ingreso.findAll({
        where: {
            ing_numeroComprobante: body.ing_numeroComprobante
        },
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
    // if (ingreso.length > 0){
    //     return res.status(201).json({
    //      ok:true,
    //      ingreso
    //     });
    // }else{
    //     return res.status(201).json({
    //         ok:false,
    //         msg: 'No se encontraron compras con el valor ingresado'
            
    //        });
    // }

    res.json({ingreso});

}



export const getIngreso =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const ingreso = await Ingreso.findByPk(id, {
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

    if(ingreso){
        
    res.json(ingreso);
    }
    else{
        res.status(404).json({
            msg:`no existe ingreso con el id ${id}`
        })
    }

}
export const postIngreso  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        const ingreso: any =  Ingreso.build(body);

        await ingreso.save();

        return res.status(201).json({
            ok:true,
            ingreso

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

export const putIngreso  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const ingreso = await Ingreso.findByPk(id);
        if(!ingreso){
            return res.status(404).json({
                msg: 'No existe ingreso con el id ' + id
            });
        }

        await ingreso.update(body);
        res.json(ingreso);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteIngreso  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const ingreso = await Ingreso.findByPk(id);
    if(!ingreso){
        return res.status(404).json({
            msg: 'No existe ingreso con el id' + id
        })
    }

    await ingreso.destroy();
    res.json(ingreso);
}