import {Router } from 'express';
import { check } from 'express-validator';
import { deleteTipoPersona, getTipoPersona, getTiposPersonas, postTipoPersona, putTipoPersona } from '../controllers/tipoPersonaController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getTiposPersonas);
router.get('/:id',      getTipoPersona);
router.post('/',  [
    check('tipoper_descripcionv','el tipo de persona es obligatorio').not().isEmpty(),
    validarCampos
],  postTipoPersona);
router.put('/:id',      putTipoPersona);
router.delete('/:id',   deleteTipoPersona);

export default router;