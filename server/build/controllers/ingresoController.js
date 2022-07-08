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
exports.deleteIngreso = exports.putIngreso = exports.postIngreso = exports.getIngreso = exports.getIngresosForDocuments = exports.getIngresosByDates = exports.getIngresos = void 0;
const ingreso_1 = __importDefault(require("../models/ingreso"));
const persona_1 = __importDefault(require("../models/persona"));
const usuario_1 = __importDefault(require("../models/usuario"));
const sequelize_1 = require("sequelize");
const getIngresos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingreso = yield ingreso_1.default.findAll({
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
    res.json({ ingreso });
});
exports.getIngresos = getIngresos;
// metodo para buscar por rango de fecha
const getIngresosByDates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const ingreso = yield ingreso_1.default.findAll({
        where: {
            createdAt: {
                [sequelize_1.Op.between]: [body.createdAt, body.ing_fechaHora]
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
            }
        ]
    });
    res.json({ ingreso });
});
exports.getIngresosByDates = getIngresosByDates;
//Metodo para buscar por numero comprobante
const getIngresosForDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const ingreso = yield ingreso_1.default.findAll({
        where: {
            ing_numeroComprobante: body.ing_numeroComprobante
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
            }
        ]
    });
    // if (ingreso.length > 0){
    //     return res.status(201).json({
    //      ok:true,
    //      ingreso
    //     });
    // }else{
    //     return res.status(201).json({
    //         ok:false,
    //         msg: 'No se encontraron compras con el valor ingresado'
    //        });
    // }
    res.json({ ingreso });
});
exports.getIngresosForDocuments = getIngresosForDocuments;
const getIngreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ingreso = yield ingreso_1.default.findByPk(id, {
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
    if (ingreso) {
        res.json(ingreso);
    }
    else {
        res.status(404).json({
            msg: `no existe ingreso con el id ${id}`
        });
    }
});
exports.getIngreso = getIngreso;
const postIngreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const ingreso = ingreso_1.default.build(body);
        yield ingreso.save();
        return res.status(201).json({
            ok: true,
            ingreso
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
exports.postIngreso = postIngreso;
const putIngreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const ingreso = yield ingreso_1.default.findByPk(id);
        if (!ingreso) {
            return res.status(404).json({
                msg: 'No existe ingreso con el id ' + id
            });
        }
        yield ingreso.update(body);
        res.json(ingreso);
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
exports.putIngreso = putIngreso;
const deleteIngreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ingreso = yield ingreso_1.default.findByPk(id);
    if (!ingreso) {
        return res.status(404).json({
            msg: 'No existe ingreso con el id' + id
        });
    }
    yield ingreso.destroy();
    res.json(ingreso);
});
exports.deleteIngreso = deleteIngreso;
//# sourceMappingURL=ingresoController.js.map