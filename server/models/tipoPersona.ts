import { DataTypes } from 'sequelize';
import db from "../database/connection";

const TipoPersona = db.define('TipoPersona', {
    id_tipoPersona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    tipoper_descripcion: {
        type: DataTypes.STRING
    },

});

export default TipoPersona;