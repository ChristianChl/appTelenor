import { DataTypes } from 'sequelize';
import db from "../database/connection";
import Persona from './persona';
import Usuario from './usuario';

const Ingreso = db.define('Ingreso', {
    id_ingreso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    ing_tipoComprobante: {
        type: DataTypes.STRING
    },

    ing_serieComprobante: {
        type: DataTypes.STRING
    },

    ing_numeroComprobante: {
        type: DataTypes.STRING
    },

    ing_fechaHora: {
        type: DataTypes.DATE
    },

    ing_impuesto: {
        type: DataTypes.DECIMAL
    },

    ing_totalCompra: {
        type: DataTypes.DECIMAL
    },
    ing_estado: {
        type: DataTypes.STRING
    },
    ing_guiaRemitente: {
        type: DataTypes.STRING
    },
    ing_ordenCompra: {
        type: DataTypes.STRING
    },
    ing_observacion:{
        type: DataTypes.STRING
    },
    ing_gravada: {
        type: DataTypes.DECIMAL
    },
    ing_igv: {
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


});
Ingreso.belongsTo(Persona, {
    as: 'Personas',
    foreignKey: "fk_id_persona"
});
Ingreso.belongsTo(Usuario, {
    as: 'Usuarios',
    foreignKey: "fk_id_usuario"
});

export default Ingreso;