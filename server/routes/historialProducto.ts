import {Router } from 'express';
import { check } from 'express-validator';
import { deleteHistorialProducto, getHistorialProducto, getHistorialProductos, getHistorialProductosByDates, postHistorialProducto, putHistorialProducto } from '../controllers/historialProducto';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getHistorialProductos);
router.post('/dates', [validarCampos],   getHistorialProductosByDates);
router.get('/:id',      getHistorialProducto);
router.post('/', [
    check('fk_id_categoria', 'La Categoria del producto es obligatorio').not().isEmpty(),
    check('fk_id_marca', 'La Marca del producto es obligatorio').not().isEmpty(),
    check('fk_id_medida', 'La Medida del producto es obligatorio').not().isEmpty(),
    check('fk_id_tipo', 'El Tipo del producto es obligatorio').not().isEmpty(),
    validarCampos
], postHistorialProducto);
router.put('/:id',     putHistorialProducto);
router.delete('/:id',      deleteHistorialProducto);

export default router;