"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const tipoProductoController_1 = require("../controllers/tipoProductoController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', tipoProductoController_1.getTiposProductos);
router.get('/:id', tipoProductoController_1.getTipoProducto);
router.post('/', [
    express_validator_1.check('tip_nombre', 'el tipo del producto es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], tipoProductoController_1.postTipoProducto);
router.put('/:id', tipoProductoController_1.putTipoProducto);
router.delete('/:id', tipoProductoController_1.deleteTipoProducto);
exports.default = router;
//# sourceMappingURL=tipoProducto.js.map