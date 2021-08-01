"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const moneda_1 = __importDefault(require("./moneda"));
const persona_1 = __importDefault(require("./persona"));
const usuario_1 = __importDefault(require("./usuario"));
const Cotizacion = connection_1.default.define('Cotizacion', {
    id_cotizacion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    coti_fechaHora: {
        type: sequelize_1.DataTypes.DATE
    },
    coti_total: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    coti_observacion: {
        type: sequelize_1.DataTypes.STRING
    },
    coti_tipoCambio: {
        type: sequelize_1.DataTypes.FLOAT
    },
    coti_hechoVenta: {
        type: sequelize_1.DataTypes.BOOLEAN
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
    fk_id_moneda: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: moneda_1.default,
            key: 'id_moneda'
        }
    }
});
Cotizacion.belongsTo(persona_1.default, {
    as: 'Personas',
    foreignKey: "fk_id_persona"
});
Cotizacion.belongsTo(usuario_1.default, {
    as: 'Usuarios',
    foreignKey: "fk_id_usuario"
});
Cotizacion.belongsTo(moneda_1.default, {
    as: 'Monedas',
    foreignKey: "fk_id_moneda"
});
exports.default = Cotizacion;
//# sourceMappingURL=cotizacion.js.map