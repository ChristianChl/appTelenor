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
exports.revalidarToken = exports.loginUsuario = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../helpers/jwt");
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findOne({
            where: {
                us_login: body.us_login
            }
        });
        const usuarioInactivo = yield usuario_1.default.findOne({
            where: {
                us_login: body.us_login,
                us_activo: 1
            }
        });
        console.log(usuario);
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe: ' + body.us_login
            });
        }
        if (!usuarioInactivo) {
            return res.status(400).json({
                msg: 'El usuario se encuentra inactivo: ' + body.us_login
            });
        }
        const validPassword = bcrypt_1.default.compareSync(body.us_clave, usuario.us_clave);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            });
        }
        const token = yield jwt_1.generarJwt(usuario.id_usuario, usuario.us_nombres);
        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: usuario.id_usuario,
            name: usuario.us_nombres,
            surnames: usuario.us_apellidos,
            email: usuario.us_email,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
});
exports.loginUsuario = loginUsuario;
const revalidarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    //Generar el JWT
    const usuario = yield usuario_1.default.findOne({
        where: {
            id_usuario: body.id_usuario,
        }
    });
    const token = yield jwt_1.generarJwt(usuario.id_usuario, usuario.us_nombres);
    return res.json({
        ok: true,
        uid: usuario.id_usuario,
        name: usuario.us_nombres,
        surnames: usuario.us_apellidos,
        email: usuario.us_email,
        token
    });
});
exports.revalidarToken = revalidarToken;
//# sourceMappingURL=auth.js.map