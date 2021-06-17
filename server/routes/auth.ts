import {Router} from 'express';
import { check } from 'express-validator';
import { loginUsuario, revalidarToken } from '../controllers/auth';
import { validarCampos } from '../middlewares/validar-campos';
import { validarJwt } from '../middlewares/validar-jwt';


const router = Router();

router.post('/', [
    check('us_login', 'El usuario es obligatorio').not().isEmpty(),
    check('us_clave', 'La clave es obligatorio').isLength({ min: 6 }),
    validarCampos
],loginUsuario );

router.get('/renew', validarJwt, revalidarToken);

export default router;
