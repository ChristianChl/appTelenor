import { DataTypes } from 'sequelize';
import db from "../database/connection";
import Moneda from './moneda';
import Persona from './persona';
import Usuario from './usuario';

const Venta = db.define('Venta', {
    id_venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    ven_tipoComprobante: {
        type: DataTypes.STRING
    },

    ven_serieComprobante: {
        type: DataTypes.STRING
    },

    ven_numeroComprobante: {
        type: DataTypes.STRING
    },
    ven_guiaRemitente: {
        type: DataTypes.STRING
    },

    ven_fechaHora: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    },

    ven_impuesto: {
        type: DataTypes.DECIMAL
    },
    ven_igv: {
        type: DataTypes.DECIMAL
    },
    ven_gravada: {
        type: DataTypes.DECIMAL
    },
    ven_total: {
        type: DataTypes.DECIMAL
    },
    ven_estado: {
        type: DataTypes.STRING
    },
    ven_tipoCambio: {
        type: DataTypes.DECIMAL
    },
    fk_id_persona: {
        type: DataTypes.INTEGER,
        references: {
            model: Persona,
            key: 'id_Persona'
        }
    },
    fk_id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    fk_id_moneda: {
        type: DataTypes.INTEGER,
        references: {
            model: Moneda,
            key: 'id_moneda'
        }
    }

});

Venta.belongsTo(Persona, {
    as: 'Personas',
    foreignKey: "fk_id_persona"
});
Venta.belongsTo(Usuario,{
    as: 'Usuarios',
    foreignKey: "fk_id_usuario"
});
Venta.belongsTo(Moneda,{
    as: 'Monedas',
    foreignKey: "fk_id_moneda"
});

export default Venta;