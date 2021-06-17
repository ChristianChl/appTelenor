"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJwt = (id_usuario, us_nombres) => {
    const payload = { id_usuario, us_nombres };
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, process.env.SECRET || 'EstOdeb3DeSERCompLic4d02080', {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                // TODO MAL
                console.log(err);
                reject(err);
            }
            else {
                // TODO BIEN
                resolve(token);
            }
        });
    });
};
exports.generarJwt = generarJwt;
//# sourceMappingURL=jwt.js.map