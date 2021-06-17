import { DataTypes } from 'sequelize';
import db from "../database/connection";

const Perfil = db.define('Perfil', {
    id_perfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    perf_nombre: {
        type: DataTypes.STRING
    },

    perf_descripcion: {
        type: DataTypes.STRING
    },
});

export default Perfil;