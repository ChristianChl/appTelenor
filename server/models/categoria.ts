import { DataTypes } from 'sequelize';
import db from "../database/connection";

const Categoria = db.define('Categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    cat_nombre: {
        type: DataTypes.STRING
    },

    cat_descripcion: {
        type: DataTypes.STRING
    },
    cat_activo: {
        type: DataTypes.BOOLEAN
    },

    // createdAt: {
    //     type: DataTypes.DATE
    // },

    // updatedAt: {
    //     type: DataTypes.DATE
    // }

});

export default Categoria;