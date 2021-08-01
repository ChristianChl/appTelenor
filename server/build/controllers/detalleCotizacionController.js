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
exports.deleteDetalleCotizacion = exports.putDetalleCotizacion = exports.postDetalleCotizacion = exports.getDetalleCotizacion = exports.getDetalleCotizaciones = void 0;
//import bcrypt from "bcrypt";
const detalleCotizacion_1 = __importDefault(require("../models/detalleCotizacion"));
const producto_1 = __importDefault(require("../models/producto"));
const cotizacion_1 = __importDefault(require("../models/cotizacion"));
"../models/cotizacion";
const getDetalleCotizaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleCotizacion = yield detalleCotizacion_1.default.findAll({
        include: [
            {
                model: producto_1.default,
                as: 'Productos',
                attributes: ["id_Producto", "prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_precioVenta", "prod_stock", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: cotizacion_1.default,
                as: 'Cotizacions',
                attributes: ["id_cotizacion", "coti_fechaHora", "coti_total", "coti_tipoCambio", "fk_id_moneda", "fk_id_persona", "fk_id_usuario"],
            }
        ]
    });
    res.json({ detalleCotizacion });
});
exports.getDetalleCotizaciones = getDetalleCotizaciones;
const getDetalleCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const detalleCotizacion = yield detalleCotizacion_1.default.findByPk(id, {
        include: [
            {
                model: producto_1.default,
                as: 'Productos',
                attributes: ["id_Producto", "prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_stock", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: cotizacion_1.default,
                as: 'Cotizacions',
                attributes: ["id_cotizacion", "coti_fechaHora", "coti_total", "coti_total", "fk_id_moneda", "fk_id_persona", "fk_id_usuario"],
            }
        ]
    });
    if (detalleCotizacion) {
        res.json(detalleCotizacion);
    }
    else {
        res.status(404).json({
            msg: `no existe detalle venta con el id ${id}`
        });
    }
});
exports.getDetalleCotizacion = getDetalleCotizacion;
const postDetalleCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const detalleCotizacion = detalleCotizacion_1.default.build(body);
        yield detalleCotizacion.save();
        return res.status(201).json({
            ok: true,
            detalleCotizacion
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
exports.postDetalleCotizacion = postDetalleCotizacion;
const putDetalleCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const detalleCotizacion = yield detalleCotizacion_1.default.findByPk(id);
        if (!detalleCotizacion) {
            return res.status(404).json({
                msg: 'No existe detalle venta con el id ' + id
            });
        }
        yield detalleCotizacion.update(body);
        res.json(detalleCotizacion);
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
exports.putDetalleCotizacion = putDetalleCotizacion;
const deleteDetalleCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const detalleCotizacion = yield detalleCotizacion_1.default.findByPk(id);
    if (!detalleCotizacion) {
        return res.status(404).json({
            msg: 'No existe detalle venta con el id' + id
        });
    }
    yield detalleCotizacion.destroy();
    res.json(detalleCotizacion);
});
exports.deleteDetalleCotizacion = deleteDetalleCotizacion;
//# sourceMappingURL=detalleCotizacionController.js.map