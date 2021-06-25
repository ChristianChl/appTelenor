"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const personaController_1 = require("../controllers/personaController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', personaController_1.getPersonas);
router.get('/:id', personaController_1.getPersona);
router.post('/', [
    express_validator_1.check('fk_id_tipoDocumento', 'El Tipo de Documento es obligatorio').not().isEmpty(),
    express_validator_1.check('per_razonSocial', 'La razón social es obligatorio').not().isEmpty(),
    express_validator_1.check('per_numeroDocumento', 'El numero de documento es obligatorio').not().isEmpty(),
    express_validator_1.check('per_direccion', 'La direccion es obligatorio').not().isEmpty(),
    express_validator_1.check('per_celular', 'El celular es obligatorio').not().isEmpty(),
    express_validator_1.check('per_email', 'El email es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], personaController_1.postPersona);
router.put('/:id', [
    express_validator_1.check('fk_id_tipoDocumento', 'El Tipo de Documento es obligatorio').not().isEmpty(),
    express_validator_1.check('per_razonSocial', 'La razón social es obligatorio').not().isEmpty(),
    express_validator_1.check('per_numeroDocumento', 'El numero de documento es obligatorio').not().isEmpty(),
    express_validator_1.check('per_direccion', 'La direccion es obligatorio').not().isEmpty(),
    express_validator_1.check('per_celular', 'El celular es obligatorio').not().isEmpty(),
    express_validator_1.check('per_email', 'El email es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], personaController_1.putPersona);
router.delete('/:id', personaController_1.deletePersona);
exports.default = router;
//# sourceMappingURL=persona.js.map