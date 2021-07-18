import { Request } from "express";
import { Response } from "express";
import UsuarioPermiso from "../models/usuarioPermiso";
import Usuario from '../models/usuario';
import Permiso from "../models/permiso";

export const getUsuarioPermisos  = async (req:Request, res:Response) =>{
    const usuarioPermiso = await UsuarioPermiso.findAll({
        include:[
            {
                model: Usuario,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento" ]
            },
            {
                model: Permiso,
                as: 'Permisos',
                attributes: ["id_permiso", "perm_nombre"]
            }
        ]
    });

    res.json({usuarioPermiso});

}

export const getUsuarioPermiso =  async (req:Request, res:Response) =>{
    const{id} = req.params;
    // const usuarioPermiso = await UsuarioPermiso.findByPk(id, {
    //     include:[
    //         {
    //             model: Usuario,
    //             as: 'Usuarios',
    //             attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento" ]
    //         },
    //         {
    //             model: Permiso,
    //             as: 'Permisos',
    //             attributes: ["id_permiso", "perm_nombre"]
    //         }
    //     ]
    // });

    // if(usuarioPermiso){
        
    // res.json(usuarioPermiso);
    // }
    // else{
    //     res.status(404).json({
    //         msg:`no existe un usuario permiso con el id ${id}`
    //     })
    // }

    const usuarioPermisos = await UsuarioPermiso.findAll(
        {
            where: {
                fk_id_usuario: id
                
            },
            include: [
                {
                    model: Usuario,
                    as: 'Usuarios',
                    attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"]
                },
                {
                    model: Permiso,
                    as: 'Permisos',
                    attributes: ["id_permiso", "perm_nombre"]
                }
            ]
        }
    );

//     usuarioPermisos.forEach(element => {
//         element.destroy();
//    });

   res.json(usuarioPermisos);



}
export const postUsuarioPermiso  = async (req:Request, res:Response) =>{
    const{body} = req;

    try {
        
        
        const usuarioPermiso: any =  UsuarioPermiso.build(body);

        await usuarioPermiso.save();

        return res.status(201).json({
            ok:true,
            usuarioPermiso

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

export const putUsuarioPermiso  = async(req:Request, res:Response) =>{
    const {id} = req.params;
    const{body} = req;

    try {
        
        const usuarioPermiso = await UsuarioPermiso.findByPk(id);
        if(!usuarioPermiso){
            return res.status(404).json({
                msg: 'No existe el usuario permiso con el id ' + id
            });
        }

        await usuarioPermiso.update(body);
        res.json(usuarioPermiso);
        //res.json(usuario);
        // res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteUsuarioPermiso  = async(req:Request, res:Response) =>{
    const {id} = req.params;

    const usuarioPermisos = await UsuarioPermiso.findAll(
        {
            where: {
                fk_id_usuario: id
                
            }
        }
    );
    // if(!usuarioPermisos){
    //     return res.status(404).json({
    //         msg: 'No existe el usuario permiso con el id' + id
    //     })
    // }

    usuarioPermisos.forEach(element => {
         element.destroy();
    });

    res.json(usuarioPermisos);
}