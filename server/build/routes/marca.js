"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const marcaControllers_1 = require("../controllers/marcaControllers");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', marcaControllers_1.getMarcas);
router.get('/:id', marcaControllers_1.getMarca);
router.post('/', [
    express_validator_1.check('mar_nombre', 'El nombre de la marca es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], marcaControllers_1.postMarca);
router.put('/:id', [
    express_validator_1.check('mar_nombre', 'El nombre de la marca es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], marcaControllers_1.putMarca);
router.delete('/:id', marcaControllers_1.deleteMarca);
exports.default = router;
//# sourceMappingURL=marca.js.map