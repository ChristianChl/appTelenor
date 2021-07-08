import { Request } from "express";
import { Response } from "express";
import sequelize from "sequelize/types/lib/sequelize";
//import bcrypt from "bcrypt";
import DetalleIngreso from "../models/detalleIngreso";
import Ingreso from "../models/ingreso";
import Producto from "../models/producto";

export const getDetalleIngresos  = async (req:Request, res:Response) =>{
    const detalleIngreso = await DetalleIngreso.findAll({
        include:[
            {
                model: Producto,
                as: 'Productos',
                attributes: ["id_Producto",  "prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_stock", "prod_activo","prod_precioVenta","fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: Ingreso,
                as: 'Ingresos',
                attributes: ["id_ingreso", "ing_tipoComprobante", "ing_serieComprobante", "ing_numeroComprobante", "ing_fechaHora", "ing_impuesto", "ing_totalCompra", "ing_estado", "fk_id_persona", "fk_id_usuario"],

            }
        ]
    });

    res.json({detalleIngreso});


}

export const getDetalleIngreso =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const detalleIngreso = await DetalleIngreso.findByPk(id, {
        include:[
            {
                model: Producto,
                as: 'Productos',
                attributes: ["id_Producto", "prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_stock","prod_activo","prod_precioVenta", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: Ingreso,
                as: 'Ingresos',
                attributes: ["id_ingreso", "ing_tipoComprobante", "ing_serieComprobante", "ing_numeroComprobante", "ing_fechaHora", "ing_impuesto", "ing_totalCompra", "ing_estado", "fk_id_persona", "fk_id_usuario"],

            }
        ]
    });

    if(detalleIngreso){
        
    res.json(detalleIngreso);
    }
    else{
        res.status(404).json({
            msg:`no existe un detalle ingreso con el id ${id}`
        })
    }

}
export const postDetalleIngreso = async (req:Request, res:Response) =>{
    const{body} = req;
    
    try {


        
        
        const detalleIngreso: any =  DetalleIngreso.build(body);
        await detalleIngreso.save();

        return res.status(201).json({
            ok:true,
            detalleIngreso

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

export const putDetalleIngreso  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const detalleIngreso = await DetalleIngreso.findByPk(id);
        if(!detalleIngreso){
            return res.status(404).json({
                msg: 'No existe detalle ingreso con el id ' + id
            });
        }

        await detalleIngreso.update(body);
        res.json(detalleIngreso);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteDetalleIngreso  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const detalleIngreso = await DetalleIngreso.findByPk(id);
    if(!detalleIngreso){
        return res.status(404).json({
            msg: 'No existe detalle ingreso con el id' + id
        })
    }

    await detalleIngreso.destroy();
    res.json(detalleIngreso);
}