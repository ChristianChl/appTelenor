"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const TipoDocumento = connection_1.default.define('TipoDocumento', {
    id_tipoDocumento: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipodoc_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
});
exports.default = TipoDocumento;
//# sourceMappingURL=tipoDocumento.js.map