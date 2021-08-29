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
exports.deleteMedida = exports.putMedida = exports.postMedida = exports.getMedida = exports.getMedidas = void 0;
const medida_1 = __importDefault(require("../models/medida"));
const sequelize_1 = require("sequelize");
const getMedidas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medida = yield medida_1.default.findAll();
    res.json({ medida });
});
exports.getMedidas = getMedidas;
const getMedida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const medida = yield medida_1.default.findByPk(id);
    if (medida) {
        res.json(medida);
    }
    else {
        res.status(404).json({
            msg: `no existe medida con el id ${id}`
        });
    }
});
exports.getMedida = getMedida;
const postMedida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeMedida = yield medida_1.default.findOne({
            where: {
                med_unidad: body.med_unidad
            }
        });
        if (existeMedida) {
            return res.status(400).json({
                msg: 'Ya existe una Unidad Medida con el nombre ' + body.med_unidad
            });
        }
        const medida = medida_1.default.build(body);
        yield medida.save();
        return res.status(201).json({
            ok: true,
            medida
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
exports.postMedida = postMedida;
const putMedida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const medida = yield medida_1.default.findByPk(id);
        if (!medida) {
            return res.status(404).json({
                msg: 'No existe medida con el id ' + id
            });
        }
        const actualizarMedida = yield medida_1.default.findOne({
            where: {
                id_medida: {
                    [sequelize_1.Op.ne]: id
                },
                med_unidad: body.med_unidad
            }
        });
        if (actualizarMedida) {
            return res.status(400).json({
                msg: 'Ya existe una Unidad Medida con el nombre ' + body.med_unidad
            });
        }
        // await medida.update(body);
        // res.json(medida);
        yield medida.update(body);
        return res.status(201).json({
            ok: true,
            medida
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putMedida = putMedida;
const deleteMedida = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const medida = yield medida_1.default.findByPk(id);
    if (!medida) {
        return res.status(404).json({
            msg: 'No existe la medida con el id' + id
        });
    }
    yield medida.destroy();
    res.json(medida);
});
exports.deleteMedida = deleteMedida;
//# sourceMappingURL=medidaController.js.map