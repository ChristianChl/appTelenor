import { Request } from "express";
import { Response } from "express";
import Categoria from "../models/categoria";
import Marca from "../models/marca";
import Medida from "../models/medida";
import Producto from "../models/producto";
import Tipo from "../models/tipoProducto";
import {Op} from 'sequelize';

export const getProductos  = async (req:Request, res:Response) =>{
    const producto = await Producto.findAll({
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
        ]
    });

    res.json({producto});

}

export const getProducto =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const producto = await Producto.findByPk(id,{
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
        ]
    });

    if(producto){
        
    res.json(producto);
    }
    else{
        res.status(404).json({
            msg:`no existe un producto con el id ${id}`
        })
    }

}
export const postProducto  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        const existeProducto = await Producto.findOne({
            where: {
                prod_modelo: body.prod_modelo.trim()
            }
        });
        if (existeProducto) {
            return res.status(400).json({
                msg: 'Ya existe un Producto con el modelo ' + body.prod_modelo
            });
        }
        
        const producto: any =  Producto.build(body);

        await producto.save();

        return res.status(201).json({
            ok:true,
            producto

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

export const putProducto  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const producto = await Producto.findByPk(id);
        if(!producto){
            return res.status(404).json({
                msg: 'No existe el producto con el id ' + id
            });
        }
        const actualizarProducto = await Producto.findOne({
            where: {
                id_Producto: {
                    [Op.ne]: id
                },
                prod_modelo: body.prod_modelo.trim()
            }
        });
        if ( actualizarProducto ) {
            return res.status(400).json({
                msg: 'Ya existe un Producto con el modelo ' + body.prod_modelo
            });
        }

        // await producto.update(body);
        // res.json(producto);

        await producto.update(body);
        return res.status(201).json({
            ok: true,
            producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteProducto  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const producto = await Producto.findByPk(id);
    if(!producto){
        return res.status(404).json({
            msg: 'No existe el producto con el id' + id
        })
    }

    await producto.destroy();
    res.json(producto);
}