import {Router } from 'express';
import { check } from 'express-validator';
import { deleteProducto, getProducto, getProductos, postProducto, putProducto } from '../controllers/productoController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getProductos);
router.get('/:id',      getProducto);
router.post('/',   [
    check('prod_modelo', 'El modelo del producto es obligatorio').not().isEmpty(),
    check('prod_descripcion', 'La descripcion del producto es obligatorio').not().isEmpty(),
    check('fk_id_categoria', 'La Categoria del producto es obligatorio').not().isEmpty(),
    check('fk_id_marca', 'La Marca del producto es obligatorio').not().isEmpty(),
    check('fk_id_medida', 'La Medida del producto es obligatorio').not().isEmpty(),
    check('fk_id_tipo', 'El Tipo del producto es obligatorio').not().isEmpty(),
    validarCampos
],  postProducto);
router.put('/:id',  [
    check('prod_modelo', 'El modelo del producto es obligatorio').not().isEmpty(),
    check('prod_descripcion', 'La descripcion del producto es obligatorio').not().isEmpty(),
    check('fk_id_categoria', 'La Categoria del producto es obligatorio').not().isEmpty(),
    check('fk_id_marca', 'La Marca del producto es obligatorio').not().isEmpty(),
    check('fk_id_medida', 'La Medida del producto es obligatorio').not().isEmpty(),
    check('fk_id_tipo', 'El Tipo del producto es obligatorio').not().isEmpty(),
    validarCampos
],     putProducto);
router.delete('/:id',      deleteProducto);

export default router;