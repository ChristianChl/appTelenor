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
exports.deleteTipoProducto = exports.putTipoProducto = exports.postTipoProducto = exports.getTipoProducto = exports.getTiposProductos = void 0;
const tipoProducto_1 = __importDefault(require("../models/tipoProducto"));
const getTiposProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tipoProducto = yield tipoProducto_1.default.findAll();
    res.json({ tipoProducto });
});
exports.getTiposProductos = getTiposProductos;
const getTipoProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tipoProducto = yield tipoProducto_1.default.findByPk(id);
    if (tipoProducto) {
        res.json(tipoProducto);
    }
    else {
        res.status(404).json({
            msg: `no existe un tipo de producto con el id ${id}`
        });
    }
});
exports.getTipoProducto = getTipoProducto;
const postTipoProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const tipoProducto = tipoProducto_1.default.build(body);
        yield tipoProducto.save();
        return res.status(201).json({
            ok: true,
            tipoProducto
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
exports.postTipoProducto = postTipoProducto;
const putTipoProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const tipoProducto = yield tipoProducto_1.default.findByPk(id);
        if (!tipoProducto) {
            return res.status(404).json({
                msg: 'No existe el tipo de producto con el id ' + id
            });
        }
        yield tipoProducto.update(body);
        res.json(tipoProducto);
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
exports.putTipoProducto = putTipoProducto;
const deleteTipoProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tipoProducto = yield tipoProducto_1.default.findByPk(id);
    if (!tipoProducto) {
        return res.status(404).json({
            msg: 'No existe el tipo producto con el id' + id
        });
    }
    yield tipoProducto.destroy();
    res.json(tipoProducto);
});
exports.deleteTipoProducto = deleteTipoProducto;
//# sourceMappingURL=tipoProductoController.js.map