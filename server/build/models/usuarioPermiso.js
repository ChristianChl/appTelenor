"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const permiso_1 = __importDefault(require("./permiso"));
const usuario_1 = __importDefault(require("./usuario"));
const UsuarioPermiso = connection_1.default.define('UsuarioPermiso', {
    id_UsuarioPermiso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_id_permiso: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: permiso_1.default,
            key: 'id_permiso'
        }
    },
    fk_id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: usuario_1.default,
            key: 'id_usuario'
        }
    },
    // createdAt: {
    //     type: DataTypes.DATE
    // },
    // updatedAt: {
    //     type: DataTypes.DATE
    // }
});
UsuarioPermiso.belongsTo(permiso_1.default, {
    as: 'Permisos',
    foreignKey: "fk_id_permiso"
});
UsuarioPermiso.belongsTo(usuario_1.default, {
    as: 'Usuarios',
    foreignKey: "fk_id_usuario"
});
exports.default = UsuarioPermiso;
//# sourceMappingURL=usuarioPermiso.js.map