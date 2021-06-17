"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const tipoPersonaController_1 = require("../controllers/tipoPersonaController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', tipoPersonaController_1.getTiposPersonas);
router.get('/:id', tipoPersonaController_1.getTipoPersona);
router.post('/', [
    express_validator_1.check('tipoper_descripcionv', 'el tipo de persona es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], tipoPersonaController_1.postTipoPersona);
router.put('/:id', tipoPersonaController_1.putTipoPersona);
router.delete('/:id', tipoPersonaController_1.deleteTipoPersona);
exports.default = router;
//# sourceMappingURL=tipoPersona.js.map