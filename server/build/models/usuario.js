"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const perfil_1 = __importDefault(require("./perfil"));
const tipoDocumento_1 = __importDefault(require("./tipoDocumento"));
const Usuario = connection_1.default.define('Usuario', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    us_apellidos: {
        type: sequelize_1.DataTypes.STRING
    },
    us_nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    us_numeroDocumento: {
        type: sequelize_1.DataTypes.STRING
    },
    us_direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    us_telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    us_email: {
        type: sequelize_1.DataTypes.STRING
    },
    us_fechaRegistro: {
        type: sequelize_1.DataTypes.DATE
    },
    us_login: {
        type: sequelize_1.DataTypes.STRING
    },
    us_clave: {
        type: sequelize_1.DataTypes.STRING
    },
    us_activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    fk_id_perfil: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: perfil_1.default,
            key: 'id_perfil'
        }
    },
    fk_id_tipoDocumento: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tipoDocumento_1.default,
            key: 'id_tipoDocumento'
        }
    },
});
Usuario.belongsTo(perfil_1.default, {
    as: 'Perfils',
    foreignKey: "fk_id_perfil"
});
Usuario.belongsTo(tipoDocumento_1.default, {
    as: 'TipoDocumentos',
    foreignKey: "fk_id_tipoDocumento"
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map