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
exports.deleteCotizacion = exports.putCotizacion = exports.postCotizacion = exports.getCotizacion = exports.getCotizaciones = void 0;
const persona_1 = __importDefault(require("../models/persona"));
const moneda_1 = __importDefault(require("../models/moneda"));
"../models/moneda";
const usuario_1 = __importDefault(require("../models/usuario"));
const cotizacion_1 = __importDefault(require("../models/cotizacion"));
"../models/cotizacion";
const getCotizaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cotizacion = yield cotizacion_1.default.findAll({
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
    res.json({ cotizacion });
});
exports.getCotizaciones = getCotizaciones;
const getCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cotizacion = yield cotizacion_1.default.findByPk(id, {
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
    if (cotizacion) {
        res.json(cotizacion);
    }
    else {
        res.status(404).json({
            msg: `no existe una cotizacion con el id ${id}`
        });
    }
});
exports.getCotizacion = getCotizacion;
const postCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const cotizacion = cotizacion_1.default.build(body);
        yield cotizacion.save();
        return res.status(201).json({
            ok: true,
            cotizacion
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
exports.postCotizacion = postCotizacion;
const putCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const cotizacion = yield cotizacion_1.default.findByPk(id);
        if (!cotizacion) {
            return res.status(404).json({
                msg: 'No existe una cotizacion con el id ' + id
            });
        }
        yield cotizacion.update(body);
        res.json(cotizacion);
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
exports.putCotizacion = putCotizacion;
const deleteCotizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cotizacion = yield cotizacion_1.default.findByPk(id);
    if (!cotizacion) {
        return res.status(404).json({
            msg: 'No existe la cotizacion con el id' + id
        });
    }
    yield cotizacion.destroy();
    res.json(cotizacion);
});
exports.deleteCotizacion = deleteCotizacion;
//# sourceMappingURL=cotizacionController.js.map