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
exports.deletePersona = exports.putPersona = exports.postPersona = exports.getPersona = exports.getPersonas = void 0;
const persona_1 = __importDefault(require("../models/persona"));
const tipoDocumento_1 = __importDefault(require("../models/tipoDocumento"));
const tipoPersona_1 = __importDefault(require("../models/tipoPersona"));
const getPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persona = yield persona_1.default.findAll({
        include: [
            {
                model: tipoPersona_1.default,
                as: 'TipoPersonas',
                attributes: ["id_tipoPersona", "tipoper_descripcion"],
            },
            {
                model: tipoDocumento_1.default,
                as: 'TipoDocumentos',
                attributes: ["id_tipoDocumento", "tipodoc_descripcion"],
            }
        ]
    });
    res.json({ persona });
});
exports.getPersonas = getPersonas;
const getPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const persona = yield persona_1.default.findByPk(id, {
        include: [
            {
                model: tipoPersona_1.default,
                as: 'TipoPersonas',
                attributes: ["id_tipoPersona", "tipoper_descripcion"],
            },
            {
                model: tipoDocumento_1.default,
                as: 'TipoDocumentos',
                attributes: ["id_tipoDocumento", "tipodoc_descripcion"],
            }
        ]
    });
    if (persona) {
        res.json(persona);
    }
    else {
        res.status(404).json({
            msg: `no existe persona con el id ${id}`
        });
    }
});
exports.getPersona = getPersona;
const postPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const persona = persona_1.default.build(body);
        yield persona.save();
        return res.status(201).json({
            ok: true,
            persona
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
exports.postPersona = postPersona;
const putPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const persona = yield persona_1.default.findByPk(id);
        if (!persona) {
            return res.status(404).json({
                msg: 'No existe persona con el id ' + id
            });
        }
        yield persona.update(body);
        return res.status(201).json({
            ok: true,
            persona
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
exports.putPersona = putPersona;
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const persona = yield persona_1.default.findByPk(id);
    if (!persona) {
        return res.status(404).json({
            msg: 'No existe la persona con el id' + id
        });
    }
    yield persona.destroy();
    res.json(persona);
});
exports.deletePersona = deletePersona;
//# sourceMappingURL=personaController.js.map