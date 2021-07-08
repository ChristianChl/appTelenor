"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDetalleIngreso = exports.putDetalleIngreso = exports.postDetalleIngreso = exports.getDetalleIngreso = exports.getDetalleIngresos = void 0;
//import bcrypt from "bcrypt";
const detalleIngreso_1 = __importDefault(require("../models/detalleIngreso"));
const ingreso_1 = __importDefault(require("../models/ingreso"));
const producto_1 = __importDefault(require("../models/producto"));
const getDetalleIngresos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleIngreso = yield detalleIngreso_1.default.findAll({
        include: [
            {
                model: producto_1.default,
                as: 'Productos',
                attributes: ["id_Producto", "prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_stock", "prod_activo", "prod_precioVenta", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: ingreso_1.default,
                as: 'Ingresos',
                attributes: ["id_ingreso", "ing_tipoComprobante", "ing_serieComprobante", "ing_numeroComprobante", "ing_fechaHora", "ing_impuesto", "ing_totalCompra", "ing_estado", "fk_id_persona", "fk_id_usuario"],
            }
        ]
    });
    res.json({ detalleIngreso });
});
exports.getDetalleIngresos = getDetalleIngresos;
const getDetalleIngreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const detalleIngreso = yield detalleIngreso_1.default.findByPk(id, {
        include: [
            {
                model: producto_1.default,
                as: 'Productos',
                attributes: ["id_Producto", "prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_stock", "prod_activo", "prod_precioVenta", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: ingreso_1.default,
                as: 'Ingresos',
                attributes: ["id_ingreso", "ing_tipoComprobante", "ing_serieComprobante", "ing_numeroComprobante", "ing_fechaHora", "ing_impuesto", "ing_totalCompra", "ing_estado", "fk_id_persona", "fk_id_usuario"],
            }
        ]
    });
    if (detalleIngreso) {
        res.json(detalleIngreso);
    }
    else {
        res.status(404).json({
            msg: `no existe un detalle ingreso con el id ${id}`
        });
    }
});
exports.getDetalleIngreso = getDetalleIngreso;
const postDetalleIngreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const detalleIngreso = detalleIngreso_1.default.build(body);
        yield detalleIngreso.save();
        return res.status(201).json({
            ok: true,
            detalleIngreso
        });
        //res.json(usuario);
        // res.json(token);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postDetalleIngreso = postDetalleIngreso;
const putDetalleIngreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const detalleIngreso = yield detalleIngreso_1.default.findByPk(id);
        if (!detalleIngreso) {
            return res.status(404).json({
                msg: 'No existe detalle ingreso con el id ' + id
            });
        }
        yield detalleIngreso.update(body);
        res.json(detalleIngreso);
        //res.json(usuario);
        // res.json(token);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putDetalleIngreso = putDetalleIngreso;
const deleteDetalleIngreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const detalleIngreso = yield detalleIngreso_1.default.findByPk(id);
    if (!detalleIngreso) {
        return res.status(404).json({
            msg: 'No existe detalle ingreso con el id' + id
        });
    }
    yield detalleIngreso.destroy();
    res.json(detalleIngreso);
});
exports.deleteDetalleIngreso = deleteDetalleIngreso;
//# sourceMappingURL=detalleIngresoController.js.map