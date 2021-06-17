"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Tipo = connection_1.default.define('Tipo', {
    id_tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tip_nombre: {
        type: sequelize_1.DataTypes.STRING
    }
    // createdAt: {
    //     type: DataTypes.DATE
    // },
    // updatedAt: {
    //     type: DataTypes.DATE
    // }
});
exports.default = Tipo;
//# sourceMappingURL=tipoProducto.js.map