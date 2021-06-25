"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const perfilController_1 = require("../controllers/perfilController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', perfilController_1.getPerfiles);
router.get('/:id', perfilController_1.getPerfil);
router.post('/', [
    express_validator_1.check('perf_nombre', 'el nombre del perfil es obligatorio').not().isEmpty(),
    express_validator_1.check('perf_descripcion', 'La descripción del perfil es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], perfilController_1.postPerfil);
router.put('/:id', [
    express_validator_1.check('perf_nombre', 'el nombre del perfil es obligatorio').not().isEmpty(),
    express_validator_1.check('perf_descripcion', 'La descripción del perfil es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], perfilController_1.putPerfil);
router.delete('/:id', perfilController_1.deletePerfil);
exports.default = router;
//# sourceMappingURL=perfil.js.map