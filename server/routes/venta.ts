import {Router } from 'express';
import { check } from 'express-validator';
import { deleteVenta, getVenta, getVentas, postVenta, putVenta } from '../controllers/ventaController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getVentas);
router.get('/:id',      getVenta);
router.post('/', [
    check('ven_tipoComprobante', 'El tipo de comprobante es obligatorio').not().isEmpty(),
    check('ven_serieComprobante', 'La serie de comprobante es obligatorio').not().isEmpty(),
    check('ven_numseroComprobante', 'El número de comprobante es obligatorio').not().isEmpty(),
    check('ven_impuesto', 'El impuesto de comprobante es obligatorio').not().isEmpty(),
    check('ven_total', 'El total de comprobante es obligatorio').not().isEmpty(),
    check('ven_estado', 'El estado de comprobante es obligatorio').not().isEmpty(),
    validarCampos
],   postVenta);
router.put('/:id',      putVenta);
router.delete('/:id',      deleteVenta);

export default router;