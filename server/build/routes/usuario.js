"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_1 = require("../controllers/usuario");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', usuario_1.getUsuarios);
router.get('/:id', usuario_1.getUsuario);
router.post('/', [
    express_validator_1.check('us_apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    express_validator_1.check('us_nombres', 'Los nombres son obligatorios').not().isEmpty(),
    express_validator_1.check('us_email', 'El email es obligatorio').isEmail(),
    express_validator_1.check('us_login', 'El usuario es obligatorio').not().isEmpty(),
    express_validator_1.check('us_clave', 'La clave es obligatorio').isLength({ min: 6 }),
    express_validator_1.check('us_activo', 'El estado es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_perfil', 'El perfil es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_tipoDocumento', 'El tipo documento es obligatorio').not().isEmpty(),
    express_validator_1.check('us_numeroDocumento', 'El número documento es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], usuario_1.postUsuario);
router.put('/:id', [
    express_validator_1.check('us_apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    express_validator_1.check('us_nombres', 'Los nombres son obligatorios').not().isEmpty(),
    express_validator_1.check('us_email', 'El email es obligatorio').isEmail(),
    express_validator_1.check('us_login', 'El usuario es obligatorio').not().isEmpty(),
    express_validator_1.check('us_clave', 'La clave es obligatorio').isLength({ min: 6 }),
    express_validator_1.check('us_activo', 'El estado es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_perfil', 'El perfil es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_tipoDocumento', 'El tipo documento es obligatorio').not().isEmpty(),
    express_validator_1.check('us_numeroDocumento', 'El número documento es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], usuario_1.putUsuario);
router.delete('/:id', usuario_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map