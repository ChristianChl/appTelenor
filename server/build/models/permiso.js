"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Permiso = connection_1.default.define('Permiso', {
    id_permiso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    perm_nombre: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Permiso;
//# sourceMappingURL=permiso.js.map