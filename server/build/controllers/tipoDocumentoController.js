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
exports.deleteTiposDocumentos = exports.putTiposDocumentos = exports.postTiposDocumentos = exports.getTiposDocumento = exports.getTiposDocumentos = void 0;
const tipoDocumento_1 = __importDefault(require("../models/tipoDocumento"));
const sequelize_1 = require("sequelize");
const getTiposDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tiposDocumentos = yield tipoDocumento_1.default.findAll();
    res.json({ tiposDocumentos });
});
exports.getTiposDocumentos = getTiposDocumentos;
const getTiposDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tiposDocumentos = yield tipoDocumento_1.default.findByPk(id);
    if (tiposDocumentos) {
        res.json(tiposDocumentos);
    }
    else {
        res.status(404).json({
            msg: `no existe tipo documento con el id ${id}`
        });
    }
});
exports.getTiposDocumento = getTiposDocumento;
const postTiposDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeDocumento = yield tipoDocumento_1.default.findOne({
            where: {
                tipodoc_descripcion: body.tipodoc_descripcion.trim()
            }
        });
        if (existeDocumento) {
            return res.status(400).json({
                msg: 'Ya existe un tipo de documento con el nombre ' + body.tipodoc_descripcion
            });
        }
        const tiposDocumentos = tipoDocumento_1.default.build(body);
        yield tiposDocumentos.save();
        return res.status(201).json({
            ok: true,
            tiposDocumentos
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
exports.postTiposDocumentos = postTiposDocumentos;
const putTiposDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const tiposDocumentos = yield tipoDocumento_1.default.findByPk(id);
        if (!tiposDocumentos) {
            return res.status(404).json({
                msg: 'No existe tipo documento con el id ' + id
            });
        }
        const actualizarTipoDocumento = yield tipoDocumento_1.default.findOne({
            where: {
                id_tipoDocumento: {
                    [sequelize_1.Op.ne]: id
                },
                tipodoc_descripcion: body.tipodoc_descripcion.trim()
            }
        });
        if (actualizarTipoDocumento) {
            return res.status(400).json({
                msg: 'Ya existe un tipo de documento con el nombre ' + body.tipodoc_descripcion
            });
        }
        // await tiposDocumentos.update(body);
        // res.json(tiposDocumentos);
        yield tiposDocumentos.update(body);
        return res.status(201).json({
            ok: true,
            tiposDocumentos
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putTiposDocumentos = putTiposDocumentos;
const deleteTiposDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tiposDocumentos = yield tipoDocumento_1.default.findByPk(id);
    if (!tiposDocumentos) {
        return res.status(404).json({
            msg: 'No existe la tipo Documento con el id' + id
        });
    }
    yield tiposDocumentos.destroy();
    res.json(tiposDocumentos);
});
exports.deleteTiposDocumentos = deleteTiposDocumentos;
//# sourceMappingURL=tipoDocumentoController.js.map