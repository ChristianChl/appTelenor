import {Router } from 'express';
import { check } from 'express-validator';
import { deleteCategoria, getCategoria, getCategorias, postCategoria, putCategoria } from '../controllers/categoriaController';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.get('/',         getCategorias);
router.get('/:id',      getCategoria);
router.post('/', [
    check('cat_nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    validarCampos
], postCategoria);
router.put('/:id',[
    check('cat_nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    validarCampos
],      putCategoria);
router.delete('/:id',   deleteCategoria);

export default router;