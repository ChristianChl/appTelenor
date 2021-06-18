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
    express_validator_1.check('prod_modelo', 'El modelo del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('prod_descripcion', 'La descripcion del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_categoria', 'La Categoria del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_marca', 'La Marca del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_medida', 'La Medida del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_tipo', 'El Tipo del producto es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], productoController_1.postProducto);
router.put('/:id', [
    express_validator_1.check('prod_modelo', 'El modelo del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('prod_descripcion', 'La descripcion del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_categoria', 'La Categoria del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_marca', 'La Marca del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_medida', 'La Medida del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_tipo', 'El Tipo del producto es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], productoController_1.putProducto);
router.delete('/:id', productoController_1.deleteProducto);
exports.default = router;
//# sourceMappingURL=producto.js.map