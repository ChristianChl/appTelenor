"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const cotizacion_1 = __importDefault(require("./cotizacion"));
const producto_1 = __importDefault(require("./producto"));
const DetalleCotizacion = connection_1.default.define('DetalleCotizacion', {
    id_detalleCotizacion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    decoti_cantidad: {
        type: sequelize_1.DataTypes.INTEGER
    },
    decoti_precioVenta: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    decoti_total: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    fk_id_producto: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: producto_1.default,
            key: 'id_Producto'
        }
    },
    fk_id_cotizacion: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: cotizacion_1.default,
            key: 'id_cotizacion'
        }
    }
});
DetalleCotizacion.belongsTo(producto_1.default, {
    as: 'Productos',
    foreignKey: "fk_id_producto"
});
DetalleCotizacion.belongsTo(cotizacion_1.default, {
    as: 'Cotizacions',
    foreignKey: "fk_id_cotizacion"
});
exports.default = DetalleCotizacion;
//# sourceMappingURL=detalleCotizacion.js.map