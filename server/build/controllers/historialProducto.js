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
exports.deleteHistorialProducto = exports.putHistorialProducto = exports.postHistorialProducto = exports.getHistorialProducto = exports.getHistorialProductos = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const marca_1 = __importDefault(require("../models/marca"));
const medida_1 = __importDefault(require("../models/medida"));
const historialProducto_1 = __importDefault(require("../models/historialProducto"));
const tipoProducto_1 = __importDefault(require("../models/tipoProducto"));
const usuario_1 = __importDefault(require("../models/usuario"));
const getHistorialProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const historialProducto = yield historialProducto_1.default.findAll({
        include: [
            {
                model: categoria_1.default,
                as: 'Categorias',
                attributes: ["id_categoria", "cat_nombre", "cat_descripcion", "cat_activo"],
            },
            {
                model: marca_1.default,
                as: 'Marcas',
                attributes: ["id_marca", "mar_nombre", "mar_descripcion", "mar_activo"],
            },
            {
                model: medida_1.default,
                as: 'Medidas',
                attributes: ["id_medida", "med_unidad"],
            },
            {
                model: tipoProducto_1.default,
                as: 'Tipos',
                attributes: ["id_tipo", "tip_nombre"],
            },
            {
                model: usuario_1.default,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"],
            },
        ]
    });
    res.json({ historialProducto });
});
exports.getHistorialProductos = getHistorialProductos;
const getHistorialProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const historialProducto = yield historialProducto_1.default.findByPk(id, {
        include: [
            {
                model: categoria_1.default,
                as: 'Categorias',
                attributes: ["id_categoria", "cat_nombre", "cat_descripcion", "cat_activo"],
            },
            {
                model: marca_1.default,
                as: 'Marcas',
                attributes: ["id_marca", "mar_nombre", "mar_descripcion", "mar_activo"],
            },
            {
                model: medida_1.default,
                as: 'Medidas',
                attributes: ["id_medida", "med_unidad"],
            },
            {
                model: tipoProducto_1.default,
                as: 'Tipos',
                attributes: ["id_tipo", "tip_nombre"],
            },
            {
                model: usuario_1.default,
                as: 'Usuarios',
                attributes: ["id_usuario", "us_apellidos", "us_nombres", "us_numeroDocumento", "us_direccion", "us_telefono", "us_email", "us_fechaRegistro", "us_login", "us_clave", "us_activo", "fk_id_perfil", "fk_id_tipoDocumento"],
            },
        ]
    });
    if (historialProducto) {
        res.json(historialProducto);
    }
    else {
        res.status(404).json({
            msg: `no existe un producto con el id ${id}`
        });
    }
});
exports.getHistorialProducto = getHistorialProducto;
const postHistorialProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const historialProducto = historialProducto_1.default.build(body);
        yield historialProducto.save();
        return res.status(201).json({
            ok: true,
            historialProducto
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
exports.postHistorialProducto = postHistorialProducto;
const putHistorialProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const historialProducto = yield historialProducto_1.default.findByPk(id);
        if (!historialProducto) {
            return res.status(404).json({
                msg: 'No existe el producto con el id ' + id
            });
        }
        yield historialProducto.update(body);
        res.json(historialProducto);
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
exports.putHistorialProducto = putHistorialProducto;
const deleteHistorialProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const historialProducto = yield historialProducto_1.default.findByPk(id);
    if (!historialProducto) {
        return res.status(404).json({
            msg: 'No existe el producto con el id' + id
        });
    }
    yield historialProducto.destroy();
    res.json(historialProducto);
});
exports.deleteHistorialProducto = deleteHistorialProducto;
//# sourceMappingURL=historialProducto.js.map