"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const venta_1 = __importDefault(require("./venta"));
const producto_1 = __importDefault(require("./producto"));
const DetalleVenta = connection_1.default.define('DetalleVenta', {
    id_detalleVenta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    detv_cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    detv_precioVenta: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    detv_subTotal: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    detv_total: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    fk_id_producto: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: producto_1.default,
            key: 'id_Producto'
        }
    },
    fk_id_venta: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: venta_1.default,
            key: 'id_venta'
        }
    },
    // createdAt: {
    //     type: DataTypes.DATE
    // },
    // updatedAt: {
    //     type: DataTypes.DATE
    // }
});
DetalleVenta.belongsTo(producto_1.default, {
    as: 'Productos',
    foreignKey: "fk_id_producto"
});
DetalleVenta.belongsTo(venta_1.default, {
    as: 'Ventas',
    foreignKey: "fk_id_venta"
});
exports.default = DetalleVenta;
//# sourceMappingURL=detalleVenta.js.map