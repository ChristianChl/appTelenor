import {Router } from 'express';
import { check } from 'express-validator';
import { deleteDetalleVenta, getDetalleVenta, getDetalleVentas, postDetalleVenta, putDetalleVenta } from '../controllers/detalleVentaController';

const router = Router();

router.get('/',         getDetalleVentas);
router.get('/:id',      getDetalleVenta);
router.post('/',        postDetalleVenta);
router.put('/:id',      putDetalleVenta);
router.delete('/:id',   deleteDetalleVenta);

export default router;