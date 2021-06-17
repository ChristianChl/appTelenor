import { DataTypes } from 'sequelize';
import db from "../database/connection";

const Marca = db.define('Marca', {
    id_marca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    mar_nombre: {
        type: DataTypes.STRING
    },

    mar_descripcion: {
        type: DataTypes.STRING
    },
    mar_activo: {
        type: DataTypes.BOOLEAN
    },

    // createdAt: {
    //     type: DataTypes.DATE
    // },

    // updatedAt: {
    //     type: DataTypes.DATE
    // }

});

export default Marca;