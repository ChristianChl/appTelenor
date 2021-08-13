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
const Venta = connection_1.default.define('Venta', {
    id_venta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ven_tipoComprobante: {
        type: sequelize_1.DataTypes.STRING
    },
    ven_serieComprobante: {
        type: sequelize_1.DataTypes.STRING
    },
    ven_numeroComprobante: {
        type: sequelize_1.DataTypes.STRING
    },
    ven_guiaRemitente: {
        type: sequelize_1.DataTypes.STRING
    },
    ven_fechaHora: {
        type: sequelize_1.DataTypes.DATE
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE
    },
    ven_impuesto: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ven_igv: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ven_gravada: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ven_total: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ven_estado: {
        type: sequelize_1.DataTypes.STRING
    },
    ven_tipoCambio: {
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
    fk_id_moneda: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: moneda_1.default,
            key: 'id_moneda'
        }
    }
});
Venta.belongsTo(persona_1.default, {
    as: 'Personas',
    foreignKey: "fk_id_persona"
});
Venta.belongsTo(usuario_1.default, {
    as: 'Usuarios',
    foreignKey: "fk_id_usuario"
});
Venta.belongsTo(moneda_1.default, {
    as: 'Monedas',
    foreignKey: "fk_id_moneda"
});
exports.default = Venta;
//# sourceMappingURL=venta.js.map