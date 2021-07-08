"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const ingreso_1 = __importDefault(require("./ingreso"));
const producto_1 = __importDefault(require("./producto"));
const DetalleIngreso = connection_1.default.define('DetalleIngreso', {
    id_detalleIngreso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    deti_cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    deti_precioCompra: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    deti_subTotal: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    deti_total: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    deti_precioVenta: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    fk_id_producto: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: producto_1.default,
            key: 'id_Producto'
        }
    },
    fk_id_ingreso: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: ingreso_1.default,
            key: 'id_ingreso'
        }
    },
    // createdAt: {
    //     type: DataTypes.DATE
    // },
    // updatedAt: {
    //     type: DataTypes.DATE
    // }
});
DetalleIngreso.belongsTo(producto_1.default, {
    as: 'Productos',
    foreignKey: "fk_id_producto"
});
DetalleIngreso.belongsTo(ingreso_1.default, {
    as: 'Ingresos',
    foreignKey: "fk_id_ingreso"
});
exports.default = DetalleIngreso;
//# sourceMappingURL=detalleIngreso.js.map