"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categoriaController_1 = require("../controllers/categoriaController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', categoriaController_1.getCategorias);
router.get('/:id', categoriaController_1.getCategoria);
router.post('/', [
    express_validator_1.check('cat_nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], categoriaController_1.postCategoria);
router.put('/:id', [
    express_validator_1.check('cat_nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], categoriaController_1.putCategoria);
router.delete('/:id', categoriaController_1.deleteCategoria);
exports.default = router;
//# sourceMappingURL=categoria.js.map