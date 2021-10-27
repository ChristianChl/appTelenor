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
exports.deletePerfil = exports.putPerfil = exports.postPerfil = exports.getPerfil = exports.getPerfiles = void 0;
const perfil_1 = __importDefault(require("../models/perfil"));
const sequelize_1 = require("sequelize");
const getPerfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const perfil = yield perfil_1.default.findAll();
    res.json({ perfil });
});
exports.getPerfiles = getPerfiles;
const getPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const perfil = yield perfil_1.default.findByPk(id);
    if (perfil) {
        res.json(perfil);
    }
    else {
        res.status(404).json({
            msg: `no existe perfil con el id ${id}`
        });
    }
});
exports.getPerfil = getPerfil;
const postPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existePerfil = yield perfil_1.default.findOne({
            where: {
                perf_nombre: body.perf_nombre.trim()
            }
        });
        if (existePerfil) {
            return res.status(400).json({
                msg: 'Ya existe un perfil con el nombre ' + body.perf_nombre
            });
        }
        const perfil = perfil_1.default.build(body);
        yield perfil.save();
        return res.status(201).json({
            ok: true,
            perfil
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
exports.postPerfil = postPerfil;
const putPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const perfil = yield perfil_1.default.findByPk(id);
        if (!perfil) {
            return res.status(404).json({
                msg: 'No existe perfil con el id ' + id
            });
        }
        const actualizarPerfil = yield perfil_1.default.findOne({
            where: {
                id_perfil: {
                    [sequelize_1.Op.ne]: id
                },
                perf_nombre: body.perf_nombre.trim()
            }
        });
        if (actualizarPerfil) {
            return res.status(400).json({
                msg: 'Ya existe un perfil con el nombre ' + body.perf_nombre
            });
        }
        // await perfil.update(body);
        // res.json(perfil);
        yield perfil.update(body);
        return res.status(201).json({
            ok: true,
            perfil
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putPerfil = putPerfil;
const deletePerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const perfil = yield perfil_1.default.findByPk(id);
    if (!perfil) {
        return res.status(404).json({
            msg: 'No existe el perfil con el id' + id
        });
    }
    yield perfil.destroy();
    res.json(perfil);
});
exports.deletePerfil = deletePerfil;
//# sourceMappingURL=perfilController.js.map