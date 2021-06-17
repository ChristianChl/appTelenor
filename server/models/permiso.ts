import { DataTypes } from 'sequelize';
import db from "../database/connection";

const Permiso = db.define('Permiso', {
    id_permiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    perm_nombre: {
        type: DataTypes.STRING
    }
});

export default Permiso;