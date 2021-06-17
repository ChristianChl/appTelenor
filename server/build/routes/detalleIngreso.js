"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalleIngresoController_1 = require("../controllers/detalleIngresoController");
const router = express_1.Router();
router.get('/', detalleIngresoController_1.getDetalleIngresos);
router.get('/:id', detalleIngresoController_1.getDetalleIngreso);
router.post('/', detalleIngresoController_1.postDetalleIngreso);
router.put('/:id', detalleIngresoController_1.putDetalleIngreso);
router.delete('/:id', detalleIngresoController_1.deleteDetalleIngreso);
exports.default = router;
//# sourceMappingURL=detalleIngreso.js.map