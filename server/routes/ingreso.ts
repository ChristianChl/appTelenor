import {Router } from 'express';
import { check } from 'express-validator';
import { deleteIngreso, getIngreso, getIngresos, getIngresosByDates, getIngresosForDocuments, postIngreso, putIngreso } from '../controllers/ingresoController';
import { validarCampos } from '../middlewares/validar-campos';
const router = Router();

router.get('/',         getIngresos);
router.post('/dates', getIngresosByDates);
router.post('/document', getIngresosForDocuments)
router.get('/:id',      getIngreso);
router.post('/',   [
    check('ing_tipoComprobante', 'El tipo de comprobante es obligatorio').not().isEmpty(),
    check('ing_serieComprobante', 'La serie de comprobante es obligatorio').not().isEmpty(),
    check('ing_numeroComprobante', 'El numero de comprobante es obligatorio').not().isEmpty(),
    check('ing_fechaHora', 'La fecha es obligatorio').not().isEmpty(),
    check('fk_id_persona', 'El Proveedor es obligatorio').not().isEmpty(),
    validarCampos
],  postIngreso);
router.put('/:id',      putIngreso);
router.delete('/:id',      deleteIngreso);

export default router;