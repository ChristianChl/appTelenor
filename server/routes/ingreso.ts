import {Router } from 'express';
import { check } from 'express-validator';
import { deleteIngreso, getIngreso, getIngresos, postIngreso, putIngreso } from '../controllers/ingresoController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getIngresos);
router.get('/:id',      getIngreso);
router.post('/',   [
    check('ing_tipoComprobante', 'El tipo de comprobante es obligatorio').not().isEmpty(),
    check('ing_serieComprobante', 'La serie de comprobante es obligatorio').not().isEmpty(),
    check('ing_numeroComprobante', 'El numero de comprobante es obligatorio').not().isEmpty(),
    check('ing_fechaHora', 'La fecha es obligatorio').not().isEmpty(),
    check('ing_impuesto', 'El impuesto es obligatorio').not().isEmpty(),
    check('ing_totalCompra', 'El total de la compra es obligatorio').not().isEmpty(),
    check('ing_estado', 'El estado de la compra es obligatorio').not().isEmpty(),
    validarCampos
],  postIngreso);
router.put('/:id',      putIngreso);
router.delete('/:id',      deleteIngreso);

export default router;