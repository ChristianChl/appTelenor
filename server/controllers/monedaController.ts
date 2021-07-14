import { Request } from "express";
import { Response } from "express";
//import bcrypt from "bcrypt";
import Moneda from "../models/moneda"; "../models/moneda";

export const getMonedas  = async (req:Request, res:Response) =>{
    const monedas = await Moneda.findAll();

    res.json({monedas});

}

export const getMoneda =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    const monedas = await Moneda.findByPk(id);

    if(monedas){
        
    res.json(monedas);
    }
    else{
        res.status(404).json({
            msg:`no existe monedas con el id ${id}`
        })
    }

}
export const postMoneda = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        const existeMonedas = await Moneda.findOne({
            where: {
                cat_nombre: body.cat_nombre
            }
        });
        if (existeMonedas) {
            return res.status(400).json({
                msg: 'Ya existe una Monedas con el nombre ' + body.cat_nombre
            });
        }
        
        const monedas: any =  Moneda.build(body);

        await monedas.save();

        return res.status(201).json({
            ok:true,
            monedas

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

export const putMoneda  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        const monedas = await Moneda.findByPk(id);
        if(!monedas){
            return res.status(404).json({
                msg: 'No existe monedas con el id ' + id
            });
        }

        await monedas.update(body);
        res.json(monedas);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
export const deleteMoneda  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const monedas = await Moneda.findByPk(id);
    if(!monedas){
        return res.status(404).json({
            msg: 'No existe monedas con el id' + id
        })
    }
    await monedas.destroy();
    res.json(monedas);
}