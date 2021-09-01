import { Request } from "express";
import { Response } from "express";
import Categoria from "../models/categoria";
import Marca from "../models/marca";
import Medida from "../models/medida";
import HistorialProducto from "../models/historialProducto";
import Tipo from "../models/tipoProducto";
import Usuario from "../models/usuario";
import {Op} from 'sequelize';

export const getHistorialProductos  = async (req:Request, res:Response) =>{
    const historialProducto = await HistorialProducto.findAll({
        include:[
            {
                model: Categoria,
                as: 'Categorias',
                attributes: ["id_categoria", "cat_nombre", "cat_descripcion", "cat_activo"],
            },
            {
                model: Marca,
                as: 'Marcas',
                attributes: ["id_marca", "mar_nombre", "mar_descripcion", "mar_activo"],

            },
            {
                model: Medida,
                as: 'Medidas',
                attributes: ["id_medida", "med_unidad"],

            },
            {
                model: Tipo,
                as: 'Tipos',
                attributes: ["id_tipo", "tip_nombre"],

            },
            {
                model: Usuario,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"],

            },
        ]
    });

    res.json({historialProducto});

}

// Metodo para buscar por rango de fecha en el historial

export const getHistorialProductosByDates  = async (req:Request, res:Response) =>{
    const{body} = req;
    try{
        const historialProducto = await HistorialProducto.findAll({
            where: {
                createdAt: {
                [Op.between]: [body.createdAt, body.endDate]
                },
                id_producto: body.id_producto

              },
            include:[
                {
                    model: Categoria,
                    as: 'Categorias',
                    attributes: ["id_categoria", "cat_nombre", "cat_descripcion", "cat_activo"],
                },
                {
                    model: Marca,
                    as: 'Marcas',
                    attributes: ["id_marca", "mar_nombre", "mar_descripcion", "mar_activo"],
    
                },
                {
                    model: Medida,
                    as: 'Medidas',
                    attributes: ["id_medida", "med_unidad"],
    
                },
                {
                    model: Tipo,
                    as: 'Tipos',
                    attributes: ["id_tipo", "tip_nombre"],
    
                },
                {
                    model: Usuario,
                    as: 'Usuarios',
                    attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"],
    
                },
            ]
        });
    

        if(historialProducto.length < 1){
            return res.status(400).json({
                msg: 'No se encontró registros en el Historial'
            });
        }
        return res.status(201).json({
            ok: true,
            historialProducto
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}



export const getHistorialProducto =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const historialProducto = await HistorialProducto.findByPk(id,{
        include:[
            {
                model: Categoria,
                as: 'Categorias',
                attributes: ["id_categoria", "cat_nombre", "cat_descripcion", "cat_activo"],
            },
            {
                model: Marca,
                as: 'Marcas',
                attributes: ["id_marca", "mar_nombre", "mar_descripcion", "mar_activo"],

            },
            {
                model: Medida,
                as: 'Medidas',
                attributes: ["id_medida", "med_unidad"],

            },
            {
                model: Tipo,
                as: 'Tipos',
                attributes: ["id_tipo", "tip_nombre"],

            },
            {
                model: Usuario,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"],

            },
        ]
    });

    if(historialProducto){
        
    res.json(historialProducto);
    }
    else{
        res.status(404).json({
            msg:`no existe un producto con el id ${id}`
        })
    }

}
export const postHistorialProducto  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        
        
        const historialProducto: any =  HistorialProducto.build(body);

        await historialProducto.save();

        return res.status(201).json({
            ok:true,
            historialProducto

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

export const putHistorialProducto  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const historialProducto = await HistorialProducto.findByPk(id);
        if(!historialProducto){
            return res.status(404).json({
                msg: 'No existe el producto con el id ' + id
            });
        }

        await historialProducto.update(body);
        res.json(historialProducto);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteHistorialProducto  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const historialProducto = await HistorialProducto.findByPk(id);
    if(!historialProducto){
        return res.status(404).json({
            msg: 'No existe el producto con el id' + id
        })
    }

    await historialProducto.destroy();
    res.json(historialProducto);
}