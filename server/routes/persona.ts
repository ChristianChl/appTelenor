import {Router } from 'express';
import { check } from 'express-validator';
import { deletePersona, getPersona, getPersonas, postPersona, putPersona } from '../controllers/personaController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getPersonas);
router.get('/:id',      getPersona);
router.post('/',  [
    check('fk_id_tipoDocumento','El Tipo de Documento es obligatorio').not().isEmpty(),
    check('per_razonSocial','La razón social es obligatorio').not().isEmpty(),
    check('per_numeroDocumento','El numero de documento es obligatorio').not().isEmpty(),
    check('per_direccion','La direccion es obligatorio').not().isEmpty(),
    check('per_celular','El celular es obligatorio').not().isEmpty(),
    check('per_email','El email es obligatorio').not().isEmpty(),
    validarCampos
] ,  postPersona);
router.put('/:id', [
    check('fk_id_tipoDocumento','El Tipo de Documento es obligatorio').not().isEmpty(),
    check('per_razonSocial','La razón social es obligatorio').not().isEmpty(),
    check('per_numeroDocumento','El numero de documento es obligatorio').not().isEmpty(),
    check('per_direccion','La direccion es obligatorio').not().isEmpty(),
    check('per_celular','El celular es obligatorio').not().isEmpty(),
    check('per_email','El email es obligatorio').not().isEmpty(),
    
    validarCampos
] ,     putPersona);
router.delete('/:id',      deletePersona);

export default router;