import {Router } from 'express';
import { check } from 'express-validator';
import { getDetalleCotizaciones, getDetalleCotizacion, postDetalleCotizacion, putDetalleCotizacion, deleteDetalleCotizacion } from '../controllers/detalleCotizacionController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',          getDetalleCotizaciones);
router.get('/:id',      getDetalleCotizacion);
router.post('/',        [
    check('decoti_cantidad', 'El nombre del producto es obligatorio').not().isEmpty(),
    validarCampos],postDetalleCotizacion);
router.put('/:id',      [
    check('decoti_cantidad', 'El nombre del producto es obligatorio').not().isEmpty(),
validarCampos],putDetalleCotizacion);
router.delete('/:id',   deleteDetalleCotizacion);


export default router;