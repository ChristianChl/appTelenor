import { DataTypes } from 'sequelize';
import db from "../database/connection";
import Moneda from './moneda';
import Persona from './persona';
import Usuario from './usuario';

const Cotizacion = db.define('Cotizacion', {
    id_cotizacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    coti_fechaHora: {
        type: DataTypes.DATE
    },
    coti_total: {
        type: DataTypes.DECIMAL
    },
    coti_observacion:{
        type: DataTypes.STRING
    },
    coti_tipoCambio:{
        type: DataTypes.FLOAT   
    },
    coti_hechoVenta: {
        type: DataTypes.BOOLEAN
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

Cotizacion.belongsTo(Persona, {
    as: 'Personas',
    foreignKey: "fk_id_persona"
});
Cotizacion.belongsTo(Usuario,{
    as: 'Usuarios',
    foreignKey: "fk_id_usuario"
});
Cotizacion.belongsTo(Moneda,{
    as: 'Monedas',
    foreignKey: "fk_id_moneda"
});

export default Cotizacion;