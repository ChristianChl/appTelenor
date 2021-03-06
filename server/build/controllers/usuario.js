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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../helpers/jwt");
const perfil_1 = __importDefault(require("../models/perfil"));
const tipoDocumento_1 = __importDefault(require("../models/tipoDocumento"));
const sequelize_1 = require("sequelize");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({
        // where:{
        //     us_eliminado: false
        // },
        include: [
            {
                model: perfil_1.default,
                as: 'Perfils',
                attributes: ["id_perfil", "perf_nombre", "perf_descripcion"],
            },
            {
                model: tipoDocumento_1.default,
                as: 'TipoDocumentos',
                attributes: ["id_tipoDocumento", "tipodoc_descripcion"],
            }
        ]
    });
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id, {
        include: [
            {
                model: perfil_1.default,
                as: 'Perfils',
                attributes: ["id_perfil", "perf_nombre", "perf_descripcion"],
            },
            {
                model: tipoDocumento_1.default,
                as: 'TipoDocumentos',
                attributes: ["id_tipoDocumento", "tipodoc_descripcion"],
            }
        ]
    });
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeLogin = yield usuario_1.default.findOne({
            where: {
                us_login: body.us_login.trim()
            }
        });
        if (existeLogin) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el login ' + body.us_login
            });
        }
        // const usuario =  Usuario.build(body);
        const salt = bcrypt_1.default.genSaltSync(10);
        body.us_clave = bcrypt_1.default.hashSync(body.us_clave, salt);
        const usuario = usuario_1.default.build(body);
        yield usuario.save();
        const token = yield jwt_1.generarJwt(usuario.id_usuario, usuario.us_nombres);
        return res.status(201).json({
            ok: true,
            usuario,
            token
        });
        //res.json(usuario);
        // res.json(token);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        const actualizarLogin = yield usuario_1.default.findOne({
            where: {
                id_usuario: {
                    [sequelize_1.Op.ne]: id
                },
                us_login: body.us_login.trim()
            }
        });
        if (actualizarLogin) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el login ' + body.us_login
            });
        }
        const actualizaClave = yield usuario_1.default.findOne({
            where: {
                // us_login: body.us_login,
                us_clave: body.us_clave
            }
        });
        if (!actualizaClave) {
            const salt = bcrypt_1.default.genSaltSync(10);
            body.us_clave = bcrypt_1.default.hashSync(body.us_clave, salt);
        }
        // await usuario.update(body);
        // res.json(usuario);
        yield usuario.update(body);
        return res.status(201).json({
            ok: true,
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    yield usuario.destroy();
    // await usuario.update({us_eliminado: true});
    res.json('el usuario ha sido borrado');
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.js.map