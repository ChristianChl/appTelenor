"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Moneda = connection_1.default.define('Moneda', {
    id_moneda: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mon_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    mon_tipoCambio: {
        type: sequelize_1.DataTypes.DECIMAL
    }
    // createdAt: {
    //     type: DataTypes.DATE
    // },
    // updatedAt: {
    //     type: DataTypes.DATE
    // }
});
exports.default = Moneda;
//# sourceMappingURL=moneda.js.map