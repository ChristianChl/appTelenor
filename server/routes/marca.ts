import {Router } from 'express';
import { check } from 'express-validator';
import { deleteMarca, getMarca, getMarcas, postMarca, putMarca } from '../controllers/marcaControllers';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getMarcas);
router.get('/:id',      getMarca);
router.post('/',  [
    check('mar_nombre', 'El nombre de la marca es obligatorio').not().isEmpty(),
    check('mar_descripcion', 'La descripción de la marca es obligatorio').not().isEmpty(),
    check('mar_activo', 'El estado de la marca es obligatorio').not().isEmpty(),
    validarCampos
],  postMarca);
router.put('/:id',      putMarca);
router.delete('/:id',      deleteMarca);

export default router;