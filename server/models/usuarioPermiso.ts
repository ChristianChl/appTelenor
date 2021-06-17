import { DataTypes } from 'sequelize';
import db from "../database/connection";
import Permiso from './permiso';
import Usuario from './usuario';

const UsuarioPermiso = db.define('UsuarioPermiso', {
    id_UsuarioPermiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_id_permiso: {
        type: DataTypes.INTEGER,
        references: {
            model: Permiso,
            key: 'id_permiso'
        }
    },
    fk_id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },

    // createdAt: {
    //     type: DataTypes.DATE
    // },

    // updatedAt: {
    //     type: DataTypes.DATE
    // }

});
UsuarioPermiso.belongsTo(Permiso, {
    as: 'Permisos',
    foreignKey: "fk_id_permiso"
});

UsuarioPermiso.belongsTo(Usuario,{
    as: 'Usuarios',
    foreignKey: "fk_id_usuario"
});




export default UsuarioPermiso;