"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Marca = connection_1.default.define('Marca', {
    id_marca: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mar_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    mar_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    mar_activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    // createdAt: {
    //     type: DataTypes.DATE
    // },
    // updatedAt: {
    //     type: DataTypes.DATE
    // }
});
exports.default = Marca;
//# sourceMappingURL=marca.js.map