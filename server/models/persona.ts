import { DataTypes } from 'sequelize';
import db from "../database/connection";
import TipoDocumento from './tipoDocumento';
import TipoPersona from './tipoPersona';

const Persona = db.define('Persona', {
    id_Persona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    per_razonSocial: {
        type: DataTypes.STRING
    },

    per_numeroDocumento: {
        type: DataTypes.STRING
    },

    per_direccion: {
        type: DataTypes.STRING
    },

    per_celular: {
        type: DataTypes.STRING
    },

    per_telefonoFijo: {
        type: DataTypes.STRING
    },

    per_email: {
        type: DataTypes.INTEGER
    },
    per_activo: {
        type: DataTypes.BOOLEAN
    },
    fk_id_tipoDocumento: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoDocumento,
            key: 'id_tipoDocumento'
        }
    },
    fk_id_tipoPersona: {
        type: DataTypes.INTEGER,
        references: {
            model: TipoPersona,
            key: 'id_tipoPersona'
        }
    },


});

Persona.belongsTo(TipoDocumento, {
    as: 'TipoDocumentos',
    foreignKey: "fk_id_tipoDocumento"
});

Persona.belongsTo(TipoPersona, {
    as: 'TipoPersonas',
    foreignKey: "fk_id_tipoPersona"
});

export default Persona;