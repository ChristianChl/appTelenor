"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const monedaController_1 = require("../controllers/monedaController");
const router = express_1.Router();
router.get('/', monedaController_1.getMonedas);
router.get('/:id', monedaController_1.getMoneda);
router.post('/', monedaController_1.postMoneda);
router.put('/:id', monedaController_1.putMoneda);
router.delete('/:id', monedaController_1.deleteMoneda);
exports.default = router;
//# sourceMappingURL=moneda.js.map