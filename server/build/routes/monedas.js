"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const monedasController_1 = require("../controllers/monedasController");
const router = express_1.Router();
router.get('/', monedasController_1.getMonedas);
router.get('/:id', monedasController_1.getMoneda);
router.post('/', monedasController_1.postMonedas);
router.put('/:id', monedasController_1.putMonedas);
router.delete('/:id', monedasController_1.deleteMonedas);
exports.default = router;
//# sourceMappingURL=monedas.js.map