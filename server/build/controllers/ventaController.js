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
exports.deleteVenta = exports.putVenta = exports.postVenta = exports.getVenta = exports.getVentas = void 0;
const persona_1 = __importDefault(require("../models/persona"));
const usuario_1 = __importDefault(require("../models/usuario"));
const venta_1 = __importDefault(require("../models/venta"));
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
            }
        ]
    });
    res.json({ venta });
});
exports.getVentas = getVentas;
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