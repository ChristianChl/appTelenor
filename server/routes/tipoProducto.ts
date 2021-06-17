import {Router } from 'express';
import { check } from 'express-validator';
import { deleteTipoProducto, getTipoProducto, getTiposProductos, postTipoProducto, putTipoProducto } from '../controllers/tipoProductoController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getTiposProductos);
router.get('/:id',      getTipoProducto);
router.post('/',  [
    check('tip_nombre', 'el tipo del producto es obligatorio').not().isEmpty(),
    validarCampos
], postTipoProducto);
router.put('/:id',      putTipoProducto);
router.delete('/:id',      deleteTipoProducto);

export default router;