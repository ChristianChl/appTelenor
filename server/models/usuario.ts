import { DataTypes, Sequelize } from 'sequelize';
import db from "../database/connection";
import Perfil from './perfil';
import TipoDocumento from './tipoDocumento';

const Usuario = db.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    us_apellidos: {
        type: DataTypes.STRING
    },

    us_nombres: {
        type: DataTypes.STRING
    },

    us_numeroDocumento: {
        type: DataTypes.STRING
    },

    us_direccion: {
        type: DataTypes.STRING
    },

    us_telefono: {
        type: DataTypes.STRING
    },

    us_email: {
        type: DataTypes.STRING
    },

    us_fechaRegistro: {
        type: DataTypes.DATE
    },

    us_login: {
        type: DataTypes.STRING
    },

    us_clave: {
        type: DataTypes.STRING
    },

    us_activo: {
        type: DataTypes.BOOLEAN
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: 'av-1.png'
    },
    fk_id_perfil: {
        type: DataTypes.INTEGER,
        references: {
            model: Perfil,
            key: 'id_perfil'
        }
        
    },

    fk_id_tipoDocumento: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoDocumento,
            key: 'id_tipoDocumento'
        }
    },

});

Usuario.belongsTo(Perfil, {
    as: 'Perfils',
    foreignKey: "fk_id_perfil"
});

Usuario.belongsTo(TipoDocumento, {
    as: 'TipoDocumentos',
    foreignKey: "fk_id_tipoDocumento"
    
});


export default Usuario;
