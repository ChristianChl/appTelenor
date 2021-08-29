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
exports.deleteMarca = exports.putMarca = exports.postMarca = exports.getMarca = exports.getMarcas = void 0;
const marca_1 = __importDefault(require("../models/marca"));
const sequelize_1 = require("sequelize");
const getMarcas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const marca = yield marca_1.default.findAll();
    res.json({ marca });
});
exports.getMarcas = getMarcas;
const getMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const marca = yield marca_1.default.findByPk(id);
    if (marca) {
        res.json(marca);
    }
    else {
        res.status(404).json({
            msg: `no existe marca con el id ${id}`
        });
    }
});
exports.getMarca = getMarca;
const postMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeMarca = yield marca_1.default.findOne({
            where: {
                mar_nombre: body.mar_nombre
            }
        });
        if (existeMarca) {
            return res.status(400).json({
                msg: 'Ya existe una Marca con el nombre ' + body.mar_nombre
            });
        }
        const marca = marca_1.default.build(body);
        yield marca.save();
        return res.status(201).json({
            ok: true,
            marca
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
exports.postMarca = postMarca;
const putMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const marca = yield marca_1.default.findByPk(id);
        if (!marca) {
            return res.status(404).json({
                msg: 'No existe marca con el id ' + id
            });
        }
        const actualizarMarca = yield marca_1.default.findOne({
            where: {
                id_marca: {
                    [sequelize_1.Op.ne]: id
                },
                mar_nombre: body.mar_nombre
            }
        });
        if (actualizarMarca) {
            return res.status(400).json({
                msg: 'Ya existe una Marca con el nombre ' + body.mar_nombre
            });
        }
        // await marca.update(body);
        // res.json(marca);
        yield marca.update(body);
        return res.status(201).json({
            ok: true,
            marca
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putMarca = putMarca;
const deleteMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const marca = yield marca_1.default.findByPk(id);
    if (!marca) {
        return res.status(404).json({
            msg: 'No existe la marca con el id' + id
        });
    }
    yield marca.destroy();
    res.json(marca);
});
exports.deleteMarca = deleteMarca;
//# sourceMappingURL=marcaControllers.js.map