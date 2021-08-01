import { Request } from "express";
import { Response } from "express";
//import bcrypt from "bcrypt";
import DetalleCotizacion from "../models/detalleCotizacion";
import Producto from "../models/producto";
import Cotizacion from "../models/cotizacion"; "../models/cotizacion";

export const getDetalleCotizaciones  = async (req:Request, res:Response) =>{
    const detalleCotizacion = await DetalleCotizacion.findAll({
        include:[
            {
                model: Producto,
                as: 'Productos',
                attributes: ["id_Producto","prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_precioVenta", "prod_stock", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: Cotizacion,
                as: 'Cotizacions',
                attributes: ["id_cotizacion", "coti_fechaHora", "coti_total", "coti_tipoCambio", "fk_id_moneda", "fk_id_persona", "fk_id_usuario"],

            }
        ]
    });

    res.json({detalleCotizacion});

}

export const getDetalleCotizacion =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const detalleCotizacion = await DetalleCotizacion.findByPk(id, {
        include:[
            {
                model: Producto,
                as: 'Productos',
                attributes: ["id_Producto", "prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_stock", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: Cotizacion,
                as: 'Cotizacions',
                attributes: ["id_cotizacion", "coti_fechaHora", "coti_total", "coti_total", "fk_id_moneda", "fk_id_persona", "fk_id_usuario"],
            }
        ]
    });

    if(detalleCotizacion){
        
    res.json(detalleCotizacion);
    }
    else{
        res.status(404).json({
            msg:`no existe detalle venta con el id ${id}`
        })
    }

}
export const postDetalleCotizacion = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        
        const detalleCotizacion: any =  DetalleCotizacion.build(body);

        await detalleCotizacion.save();

        return res.status(201).json({
            ok:true,
            detalleCotizacion

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

export const putDetalleCotizacion  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const detalleCotizacion = await DetalleCotizacion.findByPk(id);
        if(!detalleCotizacion){
            return res.status(404).json({
                msg: 'No existe detalle venta con el id ' + id
            });
        }

        await detalleCotizacion.update(body);
        res.json(detalleCotizacion);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteDetalleCotizacion  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const detalleCotizacion = await DetalleCotizacion.findByPk(id);
    if(!detalleCotizacion){
        return res.status(404).json({
            msg: 'No existe detalle venta con el id' + id
        })
    }

    await detalleCotizacion.destroy();
    res.json(detalleCotizacion);
}