"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const historialProducto_1 = require("../controllers/historialProducto");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', historialProducto_1.getHistorialProductos);
router.get('/:id', historialProducto_1.getHistorialProducto);
router.post('/', [
    express_validator_1.check('fk_id_categoria', 'La Categoria del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_marca', 'La Marca del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_medida', 'La Medida del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('fk_id_tipo', 'El Tipo del producto es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], historialProducto_1.postHistorialProducto);
router.put('/:id', historialProducto_1.putHistorialProducto);
router.delete('/:id', historialProducto_1.deleteHistorialProducto);
exports.default = router;
//# sourceMappingURL=historialProducto.js.map