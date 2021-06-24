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
exports.deleteCategoria = exports.putCategoria = exports.postCategoria = exports.getCategoria = exports.getCategorias = void 0;
//import bcrypt from "bcrypt";
const categoria_1 = __importDefault(require("../models/categoria"));
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield categoria_1.default.findAll();
    res.json({ categoria });
});
exports.getCategorias = getCategorias;
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findByPk(id);
    if (categoria) {
        res.json(categoria);
    }
    else {
        res.status(404).json({
            msg: `no existe categoria con el id ${id}`
        });
    }
});
exports.getCategoria = getCategoria;
const postCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeCategoria = yield categoria_1.default.findOne({
            where: {
                cat_nombre: body.cat_nombre
            }
        });
        if (existeCategoria) {
            return res.status(400).json({
                msg: 'Ya existe una Categoria con el nombre ' + body.cat_nombre
            });
        }
        const categoria = categoria_1.default.build(body);
        yield categoria.save();
        return res.status(201).json({
            ok: true,
            categoria
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
exports.postCategoria = postCategoria;
const putCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const categoria = yield categoria_1.default.findByPk(id);
        if (!categoria) {
            return res.status(404).json({
                msg: 'No existe categoria con el id ' + id
            });
        }
        yield categoria.update(body);
        res.json(categoria);
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
exports.putCategoria = putCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield categoria_1.default.findByPk(id);
    if (!categoria) {
        return res.status(404).json({
            msg: 'No existe categoria con el id' + id
        });
    }
    yield categoria.destroy();
    res.json(categoria);
});
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categoriaController.js.map