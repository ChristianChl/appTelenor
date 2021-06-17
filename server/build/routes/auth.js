"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = express_1.Router();
router.post('/', [
    express_validator_1.check('us_login', 'El usuario es obligatorio').not().isEmpty(),
    express_validator_1.check('us_clave', 'La clave es obligatorio').isLength({ min: 6 }),
    validar_campos_1.validarCampos
], auth_1.loginUsuario);
router.get('/renew', validar_jwt_1.validarJwt, auth_1.revalidarToken);
exports.default = router;
//# sourceMappingURL=auth.js.map