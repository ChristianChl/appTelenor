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
exports.deleteTipoPersona = exports.putTipoPersona = exports.postTipoPersona = exports.getTipoPersona = exports.getTiposPersonas = void 0;
const tipoPersona_1 = __importDefault(require("../models/tipoPersona"));
const getTiposPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tipoPersona = yield tipoPersona_1.default.findAll();
    res.json({ tipoPersona });
});
exports.getTiposPersonas = getTiposPersonas;
const getTipoPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tipoPersona = yield tipoPersona_1.default.findByPk(id);
    if (tipoPersona) {
        res.json(tipoPersona);
    }
    else {
        res.status(404).json({
            msg: `no existe tipo persona con el id ${id}`
        });
    }
});
exports.getTipoPersona = getTipoPersona;
const postTipoPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const tipoPersona = tipoPersona_1.default.build(body);
        yield tipoPersona.save();
        return res.status(201).json({
            ok: true,
            tipoPersona
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
exports.postTipoPersona = postTipoPersona;
const putTipoPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const tipoPersona = yield tipoPersona_1.default.findByPk(id);
        if (!tipoPersona) {
            return res.status(404).json({
                msg: 'No existe tipo persona con el id ' + id
            });
        }
        yield tipoPersona.update(body);
        res.json(tipoPersona);
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
exports.putTipoPersona = putTipoPersona;
const deleteTipoPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tipoPersona = yield tipoPersona_1.default.findByPk(id);
    if (!tipoPersona) {
        return res.status(404).json({
            msg: 'No existe el tipo Persona con el id' + id
        });
    }
    yield tipoPersona.destroy();
    res.json(tipoPersona);
});
exports.deleteTipoPersona = deleteTipoPersona;
//# sourceMappingURL=tipoPersonaController.js.map