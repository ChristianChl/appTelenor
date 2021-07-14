"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Monedas = connection_1.default.define('Monedas', {
    id_monedas: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mon_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    mar_cambio: {
        type: sequelize_1.DataTypes.DECIMAL
    }
    // createdAt: {
    //     type: DataTypes.DATE
    // },
    // updatedAt: {
    //     type: DataTypes.DATE
    // }
});
exports.default = Monedas;
//# sourceMappingURL=monedas.js.map