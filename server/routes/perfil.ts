import {Router } from 'express';
import { check } from 'express-validator';
import { deletePerfil, getPerfil, getPerfiles, postPerfil, putPerfil } from '../controllers/perfilController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getPerfiles);
router.get('/:id',      getPerfil);
router.post('/',  [
    check('perf_nombre', 'el nombre del perfil es obligatorio').not().isEmpty(),
    check('perf_descripcion', 'La descripción del perfil es obligatorio').not().isEmpty(),
    validarCampos
], postPerfil);
router.put('/:id',      putPerfil);
router.delete('/:id',      deletePerfil);

export default router;