"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const TipoPersona = connection_1.default.define('TipoPersona', {
    id_tipoPersona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoper_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
});
exports.default = TipoPersona;
//# sourceMappingURL=tipoPersona.js.map