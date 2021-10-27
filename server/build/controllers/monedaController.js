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
exports.deleteMoneda = exports.putMoneda = exports.postMoneda = exports.getMoneda = exports.getMonedas = void 0;
//import bcrypt from "bcrypt";
const moneda_1 = __importDefault(require("../models/moneda"));
"../models/moneda";
const getMonedas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const monedas = yield moneda_1.default.findAll();
    res.json({ monedas });
});
exports.getMonedas = getMonedas;
const getMoneda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const monedas = yield moneda_1.default.findByPk(id);
    if (monedas) {
        res.json(monedas);
    }
    else {
        res.status(404).json({
            msg: `no existe monedas con el id ${id}`
        });
    }
});
exports.getMoneda = getMoneda;
const postMoneda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeMonedas = yield moneda_1.default.findOne({
            where: {
                cat_nombre: body.cat_nombre.trim()
            }
        });
        if (existeMonedas) {
            return res.status(400).json({
                msg: 'Ya existe una Monedas con el nombre ' + body.cat_nombre
            });
        }
        const monedas = moneda_1.default.build(body);
        yield monedas.save();
        return res.status(201).json({
            ok: true,
            monedas
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
exports.postMoneda = postMoneda;
const putMoneda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const monedas = yield moneda_1.default.findByPk(id);
        if (!monedas) {
            return res.status(404).json({
                msg: 'No existe monedas con el id ' + id
            });
        }
        yield monedas.update(body);
        res.json(monedas);
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
exports.putMoneda = putMoneda;
const deleteMoneda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const monedas = yield moneda_1.default.findByPk(id);
    if (!monedas) {
        return res.status(404).json({
            msg: 'No existe monedas con el id' + id
        });
    }
    yield monedas.destroy();
    res.json(monedas);
});
exports.deleteMoneda = deleteMoneda;
//# sourceMappingURL=monedaController.js.map