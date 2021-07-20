"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cotizacionController_1 = require("../controllers/cotizacionController");
const router = express_1.Router();
router.get('/', cotizacionController_1.getCotizaciones);
router.get('/:id', cotizacionController_1.getCotizacion);
router.post('/', cotizacionController_1.postCotizacion);
router.put('/:id', cotizacionController_1.putCotizacion);
router.delete('/:id', cotizacionController_1.deleteCotizacion);
exports.default = router;
//# sourceMappingURL=cotizacion.js.map