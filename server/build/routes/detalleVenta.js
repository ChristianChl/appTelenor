"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalleVentaController_1 = require("../controllers/detalleVentaController");
const router = express_1.Router();
router.get('/', detalleVentaController_1.getDetalleVentas);
router.get('/:id', detalleVentaController_1.getDetalleVenta);
router.post('/', detalleVentaController_1.postDetalleVenta);
router.put('/:id', detalleVentaController_1.putDetalleVenta);
router.delete('/:id', detalleVentaController_1.deleteDetalleVenta);
exports.default = router;
//# sourceMappingURL=detalleVenta.js.map