import { DataTypes } from 'sequelize';
import db from "../database/connection";

const TipoDocumento = db.define('TipoDocumento', {
    id_tipoDocumento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    tipodoc_descripcion: {
        type: DataTypes.STRING
    },
});

export default TipoDocumento;