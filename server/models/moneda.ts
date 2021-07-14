import { DataTypes } from 'sequelize';
import db from "../database/connection";

const Moneda = db.define('Moneda', {
    id_moneda: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    mon_nombre: {
        type: DataTypes.STRING
    },

    mon_tipoCambio: {
        type: DataTypes.DECIMAL
    }
    

    // createdAt: {
    //     type: DataTypes.DATE
    // },

    // updatedAt: {
    //     type: DataTypes.DATE
    // }

});

export default Moneda;