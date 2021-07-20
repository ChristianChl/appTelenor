import {Router } from 'express';
import { check } from 'express-validator';
import { deleteCotizacion, getCotizacion, getCotizaciones, postCotizacion, putCotizacion } from '../controllers/cotizacionController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getCotizaciones);
router.get('/:id',      getCotizacion);
router.post('/',       postCotizacion);
router.put('/:id',      putCotizacion);
router.delete('/:id',      deleteCotizacion);

export default router;