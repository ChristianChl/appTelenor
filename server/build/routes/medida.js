"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const medidaController_1 = require("../controllers/medidaController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', medidaController_1.getMedidas);
router.get('/:id', medidaController_1.getMedida);
router.post('/', [
    express_validator_1.check('med_unidad', 'La unidad de medida es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], medidaController_1.postMedida);
router.put('/:id', [
    express_validator_1.check('med_unidad', 'La unidad de medida es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], medidaController_1.putMedida);
router.delete('/:id', medidaController_1.deleteMedida);
exports.default = router;
//# sourceMappingURL=medida.js.map