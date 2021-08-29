"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioPermisoController_1 = require("../controllers/usuarioPermisoController");
const router = express_1.Router();
router.get('/', usuarioPermisoController_1.getUsuarioPermisos);
router.post('/data', usuarioPermisoController_1.getUsuarioByIdPer);
router.get('/:id', usuarioPermisoController_1.getUsuarioPermiso);
router.post('/', usuarioPermisoController_1.postUsuarioPermiso);
router.put('/:id', usuarioPermisoController_1.putUsuarioPermiso);
router.delete('/:id', usuarioPermisoController_1.deleteUsuarioPermiso);
exports.default = router;
//# sourceMappingURL=usuarioPermiso.js.map