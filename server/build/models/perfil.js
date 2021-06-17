"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Perfil = connection_1.default.define('Perfil', {
    id_perfil: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    perf_nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    perf_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
});
exports.default = Perfil;
//# sourceMappingURL=perfil.js.map