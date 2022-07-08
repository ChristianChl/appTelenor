"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ingresoController_1 = require("../controllers/ingresoController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', ingresoController_1.getIngresos);
router.post('/dates', ingresoController_1.getIngresosByDates);
router.post('/document', ingresoController_1.getIngresosForDocuments);
router.get('/:id', ingresoController_1.getIngreso);
router.post('/', [
    express_validator_1.check('ing_tipoComprobante', 'El tipo de comprobante es obligatorio').not().isEmpty(),
    express_validator_1.check('ing_serieComprobante', 'La serie de comprobante es obligatorio').not().isEmpty(),
    express_validator_1.check('ing_numeroComprobante', 'El numero de comprobante es obligatorio').not().isEmpty(),
    express_validator_1.check('ing_fechaHora', 'La fecha es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_persona', 'El Proveedor es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], ingresoController_1.postIngreso);
router.put('/:id', ingresoController_1.putIngreso);
router.delete('/:id', ingresoController_1.deleteIngreso);
exports.default = router;
//# sourceMappingURL=ingreso.js.map