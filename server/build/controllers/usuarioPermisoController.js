"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuarioPermiso = exports.putUsuarioPermiso = exports.postUsuarioPermiso = exports.getUsuarioPermiso = exports.getUsuarioByIdPer = exports.getUsuarioPermisos = void 0;
const usuarioPermiso_1 = __importDefault(require("../models/usuarioPermiso"));
const usuario_1 = __importDefault(require("../models/usuario"));
const permiso_1 = __importDefault(require("../models/permiso"));
const getUsuarioPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioPermiso = yield usuarioPermiso_1.default.findAll({
        include: [
            {
                model: usuario_1.default,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"]
            },
            {
                model: permiso_1.default,
                as: 'Permisos',
                attributes: ["id_permiso", "perm_nombre"]
            }
        ]
    });
    res.json({ usuarioPermiso });
});
exports.getUsuarioPermisos = getUsuarioPermisos;
const getUsuarioByIdPer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const usuarioPermisos = yield usuarioPermiso_1.default.findAll({
        where: {
            fk_id_usuario: body.fk_id_usuario
        },
        include: [
            {
                model: usuario_1.default,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"]
            },
            {
                model: permiso_1.default,
                as: 'Permisos',
                where: {
                    perm_nombre: body.perm_nombre
                },
                attributes: ["id_permiso", "perm_nombre"]
            }
        ]
    });
    if (usuarioPermisos.length > 0) {
        return res.status(201).json({
            ok: true,
            usuarioPermisos
        });
    }
    else {
        return res.status(201).json({
            ok: false,
            msg: 'No se encontraron Permisos'
        });
    }
});
exports.getUsuarioByIdPer = getUsuarioByIdPer;
const getUsuarioPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
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
    const usuarioPermisos = yield usuarioPermiso_1.default.findAll({
        where: {
            fk_id_usuario: id
        },
        include: [
            {
                model: usuario_1.default,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"]
            },
            {
                model: permiso_1.default,
                as: 'Permisos',
                attributes: ["id_permiso", "perm_nombre"]
            }
        ]
    });
    //     usuarioPermisos.forEach(element => {
    //         element.destroy();
    //    });
    res.json(usuarioPermisos);
});
exports.getUsuarioPermiso = getUsuarioPermiso;
const postUsuarioPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const usuarioPermiso = usuarioPermiso_1.default.build(body);
        yield usuarioPermiso.save();
        return res.status(201).json({
            ok: true,
            usuarioPermiso
        });
        //res.json(usuario);
        // res.json(token);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuarioPermiso = postUsuarioPermiso;
const putUsuarioPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuarioPermiso = yield usuarioPermiso_1.default.findByPk(id);
        if (!usuarioPermiso) {
            return res.status(404).json({
                msg: 'No existe el usuario permiso con el id ' + id
            });
        }
        yield usuarioPermiso.update(body);
        res.json(usuarioPermiso);
        //res.json(usuario);
        // res.json(token);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUsuarioPermiso = putUsuarioPermiso;
const deleteUsuarioPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuarioPermisos = yield usuarioPermiso_1.default.findAll({
        where: {
            fk_id_usuario: id
        }
    });
    // if(!usuarioPermisos){
    //     return res.status(404).json({
    //         msg: 'No existe el usuario permiso con el id' + id
    //     })
    // }
    usuarioPermisos.forEach(element => {
        element.destroy();
    });
    res.json(usuarioPermisos);
});
exports.deleteUsuarioPermiso = deleteUsuarioPermiso;
//# sourceMappingURL=usuarioPermisoController.js.map