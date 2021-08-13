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
exports.deleteVenta = exports.putVenta = exports.postVenta = exports.getVenta = exports.getVentasByDates = exports.getVentas = void 0;
const persona_1 = __importDefault(require("../models/persona"));
const moneda_1 = __importDefault(require("../models/moneda"));
"../models/moneda";
const usuario_1 = __importDefault(require("../models/usuario"));
const venta_1 = __importDefault(require("../models/venta"));
const sequelize_1 = require("sequelize");
const getVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venta = yield venta_1.default.findAll({
        include: [
            {
                model: persona_1.default,
                as: 'Personas',
                attributes: ["id_Persona", "per_razonSocial", "per_numeroDocumento", "per_direccion", "per_celular", "per_telefonoFijo", "per_email", "fk_id_tipoDocumento", "fk_id_tipoPersona"],
            },
            {
                model: usuario_1.default,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"],
            },
            {
                model: moneda_1.default,
                as: 'Monedas',
                attributes: ["id_moneda", "mon_nombre", "mon_tipoCambio"],
            }
        ]
    });
    res.json({ venta });
});
exports.getVentas = getVentas;
// metodo para buscar por rango de fecha
const getVentasByDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const venta = yield venta_1.default.findAll({
            where: {
                createdAt: {
                    //   [Op.between]: ["2021-07-14T00:00:00.000Z", "2021-07-19T21:03:41.000Z"]
                    [sequelize_1.Op.between]: [body.createdAt, body.endDate]
                }
            },
            include: [
                {
                    model: persona_1.default,
                    as: 'Personas',
                    attributes: ["id_Persona", "per_razonSocial", "per_numeroDocumento", "per_direccion", "per_celular", "per_telefonoFijo", "per_email", "fk_id_tipoDocumento", "fk_id_tipoPersona"],
                },
                {
                    model: usuario_1.default,
                    as: 'Usuarios',
                    attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"],
                },
                {
                    model: moneda_1.default,
                    as: 'Monedas',
                    attributes: ["id_moneda", "mon_nombre", "mon_tipoCambio"],
                }
            ]
        });
        if (venta.length < 1) {
            return res.status(400).json({
                msg: 'No se encontró registros de ventas con el rango del: ' + body.createdAt + " hasta " + body.ven_fechaHora
            });
        }
        return res.status(201).json({
            ok: true,
            venta
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    // res.json({venta});
});
exports.getVentasByDates = getVentasByDates;
const getVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const venta = yield venta_1.default.findByPk(id, {
        include: [
            {
                model: persona_1.default,
                as: 'Personas',
                attributes: ["id_Persona", "per_razonSocial", "per_numeroDocumento", "per_direccion", "per_celular", "per_telefonoFijo", "per_email", "fk_id_tipoDocumento", "fk_id_tipoPersona"],
            },
            {
                model: usuario_1.default,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"],
            },
            {
                model: moneda_1.default,
                as: 'Monedas',
                attributes: ["id_moneda", "mon_nombre", "mon_tipoCambio"],
            }
        ]
    });
    if (venta) {
        res.json(venta);
    }
    else {
        res.status(404).json({
            msg: `no existe una venta con el id ${id}`
        });
    }
});
exports.getVenta = getVenta;
const postVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const venta = venta_1.default.build(body);
        yield venta.save();
        return res.status(201).json({
            ok: true,
            venta
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
exports.postVenta = postVenta;
const putVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const venta = yield venta_1.default.findByPk(id);
        if (!venta) {
            return res.status(404).json({
                msg: 'No existe una venta con el id ' + id
            });
        }
        yield venta.update(body);
        res.json(venta);
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
exports.putVenta = putVenta;
const deleteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const venta = yield venta_1.default.findByPk(id);
    if (!venta) {
        return res.status(404).json({
            msg: 'No existe la venta con el id' + id
        });
    }
    yield venta.destroy();
    res.json(venta);
});
exports.deleteVenta = deleteVenta;
//# sourceMappingURL=ventaController.js.map