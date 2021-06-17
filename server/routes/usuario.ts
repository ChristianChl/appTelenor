
import {Router} from 'express';
import { check } from 'express-validator';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuario';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.get('/',       getUsuarios);
router.get('/:id',    getUsuario);
router.post('/', [
    check('us_apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('us_nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('us_email', 'El email es obligatorio').isEmail(),
    check('us_login', 'El usuario es obligatorio').not().isEmpty(),
    check('us_clave', 'La clave es obligatorio').isLength({ min: 6 }),
    check('us_activo', 'El estado es obligatorio').not().isEmpty(),
    check('fk_id_perfil', 'El perfil es obligatorio').not().isEmpty(),
    check('fk_id_tipoDocumento', 'El tipo documento es obligatorio').not().isEmpty(),
    check('us_numeroDocumento', 'El número documento es obligatorio').not().isEmpty(),
    validarCampos
],  postUsuario);
router.put('/:id', [
    check('us_apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('us_nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('us_email', 'El email es obligatorio').isEmail(),
    check('us_login', 'El usuario es obligatorio').not().isEmpty(),
    check('us_clave', 'La clave es obligatorio').isLength({ min: 6 }),
    check('us_activo', 'El estado es obligatorio').not().isEmpty(),
    check('fk_id_perfil', 'El perfil es obligatorio').not().isEmpty(),
    check('fk_id_tipoDocumento', 'El tipo documento es obligatorio').not().isEmpty(),
    check('us_numeroDocumento', 'El número documento es obligatorio').not().isEmpty(),
    validarCampos
],  putUsuario);
router.delete('/:id', deleteUsuario);
export default router;
