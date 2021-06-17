import {Router } from 'express';
import { check } from 'express-validator';
import { deletePermiso, getPermiso, getPermisos, postPermiso, putPermiso } from '../controllers/permisoController';

import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getPermisos);
router.get('/:id',      getPermiso);
router.post('/',  [
    check('perm_nombre', 'el nombre del permiso es obligatorio').not().isEmpty(),
    validarCampos
], postPermiso);
router.put('/:id',      putPermiso);
router.delete('/:id',      deletePermiso);

export default router;