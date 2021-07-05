import {Router } from 'express';
import { check } from 'express-validator';
import { deleteDetalleIngreso, getDetalleIngreso, getDetalleIngresos, postDetalleIngreso, putDetalleIngreso } from '../controllers/detalleIngresoController';

const router = Router();

router.get('/',         getDetalleIngresos);
router.get('/:id',      getDetalleIngreso);
router.post('/',        postDetalleIngreso);
router.put('/:id',      putDetalleIngreso); 
router.delete('/:id',   deleteDetalleIngreso);

export default router;