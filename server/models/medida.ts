import { DataTypes } from 'sequelize';
import db from "../database/connection";

const Medida = db.define('Medida', {
    id_medida: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    med_unidad: {
        type: DataTypes.STRING
    }

    // createdAt: {
    //     type: DataTypes.DATE
    // },

    // updatedAt: {
    //     type: DataTypes.DATE
    // }

});

export default Medida;