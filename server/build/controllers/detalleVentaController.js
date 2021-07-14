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
exports.deleteDetalleVenta = exports.putDetalleVenta = exports.postDetalleVenta = exports.getDetalleVenta = exports.getDetalleVentas = void 0;
//import bcrypt from "bcrypt";
const detalleVenta_1 = __importDefault(require("../models/detalleVenta"));
const producto_1 = __importDefault(require("../models/producto"));
const venta_1 = __importDefault(require("../models/venta"));
const getDetalleVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleVenta = yield detalleVenta_1.default.findAll({
        include: [
            {
                model: producto_1.default,
                as: 'Productos',
                attributes: ["id_Producto", "prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_stock", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: venta_1.default,
                as: 'Ventas',
                attributes: ["id_venta", "ven_tipoComprobante", "ven_serieComprobante", "ven_numeroComprobante", "ven_fechaHora", "ven_impuesto", "ven_total", "ven_estado", "fk_id_persona", "fk_id_usuario"],
            }
        ]
    });
    res.json({ detalleVenta });
});
exports.getDetalleVentas = getDetalleVentas;
const getDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const detalleVenta = yield detalleVenta_1.default.findByPk(id, {
        include: [
            {
                model: producto_1.default,
                as: 'Productos',
                attributes: ["id_Producto", "prod_nombre", "prod_caracteristica", "prod_descripcion", "prod_imagen", "prod_modelo", "prod_stock", "fk_id_categoria", "fk_id_marca", "fk_id_medida", "fk_id_tipo"],
            },
            {
                model: venta_1.default,
                as: 'Ventas',
                attributes: ["id_venta", "ven_tipoComprobante", "ven_serieComprobante", "ven_numeroComprobante", "ven_fechaHora", "ven_impuesto", "ven_total", "ven_estado", "fk_id_persona", "fk_id_usuario"],
            }
        ]
    });
    if (detalleVenta) {
        res.json(detalleVenta);
    }
    else {
        res.status(404).json({
            msg: `no existe detalle venta con el id ${id}`
        });
    }
});
exports.getDetalleVenta = getDetalleVenta;
const postDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const detalleVenta = detalleVenta_1.default.build(body);
        yield detalleVenta.save();
        return res.status(201).json({
            ok: true,
            detalleVenta
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
exports.postDetalleVenta = postDetalleVenta;
const putDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const detalleVenta = yield detalleVenta_1.default.findByPk(id);
        if (!detalleVenta) {
            return res.status(404).json({
                msg: 'No existe detalle venta con el id ' + id
            });
        }
        yield detalleVenta.update(body);
        res.json(detalleVenta);
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
exports.putDetalleVenta = putDetalleVenta;
const deleteDetalleVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const detalleVenta = yield detalleVenta_1.default.findByPk(id);
    if (!detalleVenta) {
        return res.status(404).json({
            msg: 'No existe detalle venta con el id' + id
        });
    }
    yield detalleVenta.destroy();
    res.json(detalleVenta);
});
exports.deleteDetalleVenta = deleteDetalleVenta;
//# sourceMappingURL=detalleVentaController.js.map