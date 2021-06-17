"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productoController_1 = require("../controllers/productoController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', productoController_1.getProductos);
router.get('/:id', productoController_1.getProducto);
router.post('/', [
    express_validator_1.check('prod_caracteristica', 'La caracteristica del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('prod_modelo', 'El modelo del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('prod_stock', 'El stock del producto es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], productoController_1.postProducto);
router.put('/:id', productoController_1.putProducto);
router.delete('/:id', productoController_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=producto.js.map