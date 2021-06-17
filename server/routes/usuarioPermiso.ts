import {Router } from 'express';
import { check } from 'express-validator';
import { deleteUsuarioPermiso, getUsuarioPermiso, getUsuarioPermisos, postUsuarioPermiso, putUsuarioPermiso } from '../controllers/usuarioPermisoController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getUsuarioPermisos);
router.get('/:id',      getUsuarioPermiso);
router.post('/',        postUsuarioPermiso);
router.put('/:id',      putUsuarioPermiso);
router.delete('/:id',      deleteUsuarioPermiso);

export default router;