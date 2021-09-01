"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const categoria_1 = __importDefault(require("./categoria"));
const marca_1 = __importDefault(require("./marca"));
const medida_1 = __importDefault(require("./medida"));
const tipoProducto_1 = __importDefault(require("./tipoProducto"));
const usuario_1 = __importDefault(require("./usuario"));
const HistorialProducto = connection_1.default.define('HistorialProducto', {
    id_historial: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_producto: {
        type: sequelize_1.DataTypes.INTEGER
    },
    hist_caracteristica: {
        type: sequelize_1.DataTypes.STRING
    },
    hist_descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    hist_imagen: {
        type: sequelize_1.DataTypes.STRING
    },
    hist_modelo: {
        type: sequelize_1.DataTypes.STRING
    },
    hist_stock: {
        type: sequelize_1.DataTypes.INTEGER
    },
    hist_activo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    hist_precioVenta: {
        type: sequelize_1.DataTypes.FLOAT
    },
    hist_cantVenta: {
        type: sequelize_1.DataTypes.INTEGER
    },
    hist_cantCompra: {
        type: sequelize_1.DataTypes.INTEGER
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE
    },
    fk_id_categoria: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: categoria_1.default,
            key: 'id_categoria'
        }
    },
    fk_id_marca: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: marca_1.default,
            key: 'id_marca'
        }
    },
    fk_id_medida: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: medida_1.default,
            key: 'id_medida'
        }
    },
    fk_id_tipo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tipoProducto_1.default,
            key: 'id_tipo'
        }
    },
    hist_cambioTiempo: {
        type: sequelize_1.DataTypes.STRING
    },
    fk_id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: usuario_1.default,
            key: 'id_usuario'
        }
    }
});
HistorialProducto.belongsTo(usuario_1.default, {
    as: 'Usuarios',
    foreignKey: "fk_id_usuario"
});
HistorialProducto.belongsTo(categoria_1.default, {
    as: 'Categorias',
    foreignKey: "fk_id_categoria"
});
HistorialProducto.belongsTo(marca_1.default, {
    as: 'Marcas',
    foreignKey: "fk_id_marca"
});
HistorialProducto.belongsTo(medida_1.default, {
    as: 'Medidas',
    foreignKey: "fk_id_medida"
});
HistorialProducto.belongsTo(tipoProducto_1.default, {
    as: 'Tipos',
    foreignKey: "fk_id_tipo"
});
exports.default = HistorialProducto;
//# sourceMappingURL=historialProducto.js.map