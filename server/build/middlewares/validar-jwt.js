"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJwt = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        });
    }
    try {
        const { id_usuario, us_nombres } = jsonwebtoken_1.default.verify(token, process.env.SECRET || 'EstOdeb3DeSERCompLic4d02080');
        req.body.id_usuario = id_usuario;
        req.body.us_nombres = us_nombres;
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no válido'
        });
    }
    next();
};
exports.validarJwt = validarJwt;
//# sourceMappingURL=validar-jwt.js.map