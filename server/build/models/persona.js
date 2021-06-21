"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const tipoDocumento_1 = __importDefault(require("./tipoDocumento"));
const tipoPersona_1 = __importDefault(require("./tipoPersona"));
const Persona = connection_1.default.define('Persona', {
    id_Persona: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    per_razonSocial: {
        type: sequelize_1.DataTypes.STRING
    },
    per_numeroDocumento: {
        type: sequelize_1.DataTypes.STRING
    },
    per_direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    per_celular: {
        type: sequelize_1.DataTypes.STRING
    },
    per_telefonoFijo: {
        type: sequelize_1.DataTypes.STRING
    },
    per_email: {
        type: sequelize_1.DataTypes.INTEGER
    },
    per_activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    fk_id_tipoDocumento: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tipoDocumento_1.default,
            key: 'id_tipoDocumento'
        }
    },
    fk_id_tipoPersona: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tipoPersona_1.default,
            key: 'id_tipoPersona'
        }
    },
});
Persona.belongsTo(tipoDocumento_1.default, {
    as: 'TipoDocumentos',
    foreignKey: "fk_id_tipoDocumento"
});
Persona.belongsTo(tipoPersona_1.default, {
    as: 'TipoPersonas',
    foreignKey: "fk_id_tipoPersona"
});
exports.default = Persona;
//# sourceMappingURL=persona.js.map