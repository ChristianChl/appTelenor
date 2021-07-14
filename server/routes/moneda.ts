import {Router } from 'express';
import { check } from 'express-validator';
import { deleteMoneda, getMoneda, getMonedas, postMoneda, putMoneda } from '../controllers/monedaController';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.get('/',         getMonedas);
router.get('/:id',      getMoneda);
router.post('/',        postMoneda);
router.put('/:id',      putMoneda);
router.delete('/:id',   deleteMoneda);

export default router;