"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ventaController_1 = require("../controllers/ventaController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', ventaController_1.getVentas);
router.post('/dates', ventaController_1.getVentasByDates);
router.get('/:id', ventaController_1.getVenta);
router.post('/', [
    express_validator_1.check('ven_tipoComprobante', 'El tipo de comprobante es obligatorio').not().isEmpty(),
    express_validator_1.check('ven_serieComprobante', 'La serie de comprobante es obligatorio').not().isEmpty(),
    express_validator_1.check('ven_numeroComprobante', 'El número de comprobante es obligatorio').not().isEmpty(),
    //check('ven_total', 'El total de comprobante es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], ventaController_1.postVenta);
router.put('/:id', ventaController_1.putVenta);
router.delete('/:id', ventaController_1.deleteVenta);
exports.default = router;
//# sourceMappingURL=venta.js.map