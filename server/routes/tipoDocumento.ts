import {Router } from 'express';
import { check } from 'express-validator';
import { deleteTiposDocumentos, getTiposDocumento, getTiposDocumentos, postTiposDocumentos, putTiposDocumentos } from '../controllers/tipoDocumentoController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getTiposDocumentos);
router.get('/:id',      getTiposDocumento);
router.post('/', [
    check('tipodoc_descripcion','el tipo de documento es obligatorio').not().isEmpty(),
    validarCampos
],  postTiposDocumentos);
router.put('/:id', [
    check('tipodoc_descripcion','el tipo de documento es obligatorio').not().isEmpty(),
    validarCampos
] , putTiposDocumentos);
router.delete('/:id',      deleteTiposDocumentos);

export default router;