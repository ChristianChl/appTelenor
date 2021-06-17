import {Router } from 'express';
import { check } from 'express-validator';
import { deleteProducto, getProducto, getProductos, postProducto, putProducto } from '../controllers/productoController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getProductos);
router.get('/:id',      getProducto);
router.post('/',   [
    check('prod_caracteristica', 'La caracteristica del producto es obligatorio').not().isEmpty(),
    check('prod_modelo', 'El modelo del producto es obligatorio').not().isEmpty(),
    check('prod_stock', 'El stock del producto es obligatorio').not().isEmpty(),
    validarCampos
],  postProducto);
router.put('/:id',      putProducto);
router.delete('/:id',      deleteProducto);

export default router;