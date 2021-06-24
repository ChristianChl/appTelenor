import {Router } from 'express';
import { check } from 'express-validator';
import { deleteMedida, getMedida, getMedidas, postMedida, putMedida } from '../controllers/medidaController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getMedidas);
router.get('/:id',      getMedida);
router.post('/', [
    check('med_unidad','La unidad de medida es obligatorio').not().isEmpty(),
    validarCampos
],  postMedida);
router.put('/:id', [
    check('med_unidad','La unidad de medida es obligatorio').not().isEmpty(),
    validarCampos
],     putMedida);
router.delete('/:id',      deleteMedida);

export default router;