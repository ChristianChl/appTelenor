"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const categoria_1 = __importDefault(require("./categoria"));
const marca_1 = __importDefault(require("./marca"));
const medida_1 = __importDefault(require("./medida"));
const tipoProducto_1 = __importDefault(require("./tipoProducto"));
const Producto = connection_1.default.define('Producto', {
    id_Producto: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // prod_nombre: {
    //     type: DataTypes.STRING
    // },
    prod_caracteristica: {
        type: sequelize_1.DataTypes.STRING
    },
    prod_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    prod_imagen: {
        type: sequelize_1.DataTypes.STRING
    },
    prod_modelo: {
        type: sequelize_1.DataTypes.STRING
    },
    prod_stock: {
        type: sequelize_1.DataTypes.INTEGER
    },
    prod_activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    prod_precioVenta: {
        type: sequelize_1.DataTypes.FLOAT
    },
    fk_id_categoria: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: categoria_1.default,
            key: 'id_categoria'
        }
    },
    fk_id_marca: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: marca_1.default,
            key: 'id_marca'
        }
    },
    fk_id_medida: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: medida_1.default,
            key: 'id_medida'
        }
    },
    fk_id_tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tipoProducto_1.default,
            key: 'id_tipo'
        }
    },
});
Producto.belongsTo(categoria_1.default, {
    as: 'Categorias',
    foreignKey: "fk_id_categoria"
});
Producto.belongsTo(marca_1.default, {
    as: 'Marcas',
    foreignKey: "fk_id_marca"
});
Producto.belongsTo(medida_1.default, {
    as: 'Medidas',
    foreignKey: "fk_id_medida"
});
Producto.belongsTo(tipoProducto_1.default, {
    as: 'Tipos',
    foreignKey: "fk_id_tipo"
});
exports.default = Producto;
//# sourceMappingURL=producto.js.map