"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const detalleCotizacionController_1 = require("../controllers/detalleCotizacionController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', detalleCotizacionController_1.getDetalleCotizaciones);
router.get('/:id', detalleCotizacionController_1.getDetalleCotizacion);
router.post('/', [
    express_validator_1.check('decoti_cantidad', 'El nombre del producto es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], detalleCotizacionController_1.postDetalleCotizacion);
router.put('/:id', [
    express_validator_1.check('decoti_cantidad', 'El nombre del producto es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], detalleCotizacionController_1.putDetalleCotizacion);
router.delete('/:id', detalleCotizacionController_1.deleteDetalleCotizacion);
exports.default = router;
//# sourceMappingURL=detalleCotizacion.js.map