import { Request } from "express";
import { Response } from "express";
//import bcrypt from "bcrypt";
import DetalleVenta from "../models/detalleVenta";
import Producto from "../models/producto";
import Venta from "../models/venta";

export const getDetalleVentas  = async (req:Request, res:Response) =>{
    const detalleVenta = await DetalleVenta.findAll({
        include:[
            {
                model: Producto,
                as: 'Productos',
                attributes: ["id_Producto","prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_stock", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: Venta,
                as: 'Ventas',
                attributes: ["id_venta", "ven_tipoComprobante", "ven_serieComprobante", "ven_numeroComprobante", "ven_fechaHora", "ven_impuesto", "ven_total", "ven_estado", "fk_id_persona", "fk_id_usuario"],

            }
        ]
    });

    res.json({detalleVenta});

}

export const getDetalleVenta =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const detalleVenta = await DetalleVenta.findByPk(id, {
        include:[
            {
                model: Producto,
                as: 'Productos',
                attributes: ["id_Producto", "prod_nombre", "prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_stock", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: Venta,
                as: 'Ventas',
                attributes: ["id_venta", "ven_tipoComprobante", "ven_serieComprobante", "ven_numeroComprobante", "ven_fechaHora", "ven_impuesto", "ven_total", "ven_estado", "fk_id_persona", "fk_id_usuario"],

            }
        ]
    });

    if(detalleVenta){
        
    res.json(detalleVenta);
    }
    else{
        res.status(404).json({
            msg:`no existe detalle venta con el id ${id}`
        })
    }

}
export const postDetalleVenta = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        
        const detalleVenta: any =  DetalleVenta.build(body);

        await detalleVenta.save();

        return res.status(201).json({
            ok:true,
            detalleVenta

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

export const putDetalleVenta  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const detalleVenta = await DetalleVenta.findByPk(id);
        if(!detalleVenta){
            return res.status(404).json({
                msg: 'No existe detalle venta con el id ' + id
            });
        }

        await detalleVenta.update(body);
        res.json(detalleVenta);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteDetalleVenta  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const detalleVenta = await DetalleVenta.findByPk(id);
    if(!detalleVenta){
        return res.status(404).json({
            msg: 'No existe detalle venta con el id' + id
        })
    }

    await detalleVenta.destroy();
    res.json(detalleVenta);
}