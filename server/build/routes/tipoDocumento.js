"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const tipoDocumentoController_1 = require("../controllers/tipoDocumentoController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', tipoDocumentoController_1.getTiposDocumentos);
router.get('/:id', tipoDocumentoController_1.getTiposDocumento);
router.post('/', [
    express_validator_1.check('tipodoc_descripcion', 'el tipo de documento es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], tipoDocumentoController_1.postTiposDocumentos);
router.put('/:id', [
    express_validator_1.check('tipodoc_descripcion', 'el tipo de documento es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], tipoDocumentoController_1.putTiposDocumentos);
router.delete('/:id', tipoDocumentoController_1.deleteTiposDocumentos);
exports.default = router;
//# sourceMappingURL=tipoDocumento.js.map