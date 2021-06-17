"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const permisoController_1 = require("../controllers/permisoController");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', permisoController_1.getPermisos);
router.get('/:id', permisoController_1.getPermiso);
router.post('/', [
    express_validator_1.check('perm_nombre', 'el nombre del permiso es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], permisoController_1.postPermiso);
router.put('/:id', permisoController_1.putPermiso);
router.delete('/:id', permisoController_1.deletePermiso);
exports.default = router;
//# sourceMappingURL=permiso.js.map