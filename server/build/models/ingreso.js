"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const persona_1 = __importDefault(require("./persona"));
const usuario_1 = __importDefault(require("./usuario"));
const Ingreso = connection_1.default.define('Ingreso', {
    id_ingreso: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ing_tipoComprobante: {
        type: sequelize_1.DataTypes.STRING
    },
    ing_serieComprobante: {
        type: sequelize_1.DataTypes.STRING
    },
    ing_numeroComprobante: {
        type: sequelize_1.DataTypes.STRING
    },
    ing_fechaHora: {
        type: sequelize_1.DataTypes.DATE
    },
    ing_impuesto: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ing_totalCompra: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ing_estado: {
        type: sequelize_1.DataTypes.STRING
    },
    ing_guiaRemitente: {
        type: sequelize_1.DataTypes.STRING
    },
    ing_ordenCompra: {
        type: sequelize_1.DataTypes.STRING
    },
    ing_observacion: {
        type: sequelize_1.DataTypes.STRING
    },
    ing_gravada: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ing_igv: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    fk_id_persona: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: persona_1.default,
            key: 'id_Persona'
        }
    },
    fk_id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: usuario_1.default,
            key: 'id_usuario'
        }
    },
});
Ingreso.belongsTo(persona_1.default, {
    as: 'Personas',
    foreignKey: "fk_id_persona"
});
Ingreso.belongsTo(usuario_1.default, {
    as: 'Usuarios',
    foreignKey: "fk_id_usuario"
});
exports.default = Ingreso;
//# sourceMappingURL=ingreso.js.map