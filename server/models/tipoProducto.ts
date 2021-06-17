import { DataTypes } from 'sequelize';
import db from "../database/connection";

const Tipo = db.define('Tipo', {
    id_tipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    tip_nombre: {
        type: DataTypes.STRING
    }
    // createdAt: {
    //     type: DataTypes.DATE
    // },

    // updatedAt: {
    //     type: DataTypes.DATE
    // }

});

export default Tipo;