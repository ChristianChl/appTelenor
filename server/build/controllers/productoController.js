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
exports.deleteProducto = exports.putProducto = exports.postProducto = exports.getProducto = exports.getProductos = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const marca_1 = __importDefault(require("../models/marca"));
const medida_1 = __importDefault(require("../models/medida"));
const producto_1 = __importDefault(require("../models/producto"));
const tipoProducto_1 = __importDefault(require("../models/tipoProducto"));
const sequelize_1 = require("sequelize");
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const producto = yield producto_1.default.findAll({
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
        ]
    });
    res.json({ producto });
});
exports.getProductos = getProductos;
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield producto_1.default.findByPk(id, {
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
        ]
    });
    if (producto) {
        res.json(producto);
    }
    else {
        res.status(404).json({
            msg: `no existe un producto con el id ${id}`
        });
    }
});
exports.getProducto = getProducto;
const postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeProducto = yield producto_1.default.findOne({
            where: {
                prod_modelo: body.prod_modelo
            }
        });
        if (existeProducto) {
            return res.status(400).json({
                msg: 'Ya existe un Producto con el modelo ' + body.prod_modelo
            });
        }
        const producto = producto_1.default.build(body);
        yield producto.save();
        return res.status(201).json({
            ok: true,
            producto
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
exports.postProducto = postProducto;
const putProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const producto = yield producto_1.default.findByPk(id);
        if (!producto) {
            return res.status(404).json({
                msg: 'No existe el producto con el id ' + id
            });
        }
        const actualizarProducto = yield producto_1.default.findOne({
            where: {
                id_Producto: {
                    [sequelize_1.Op.ne]: id
                },
                prod_modelo: body.prod_modelo
            }
        });
        if (actualizarProducto) {
            return res.status(400).json({
                msg: 'Ya existe un Producto con el modelo ' + body.prod_modelo
            });
        }
        // await producto.update(body);
        // res.json(producto);
        yield producto.update(body);
        return res.status(201).json({
            ok: true,
            producto
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putProducto = putProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield producto_1.default.findByPk(id);
    if (!producto) {
        return res.status(404).json({
            msg: 'No existe el producto con el id' + id
        });
    }
    yield producto.destroy();
    res.json(producto);
});
exports.deleteProducto = deleteProducto;
//# sourceMappingURL=productoController.js.map