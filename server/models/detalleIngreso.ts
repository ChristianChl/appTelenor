import { DataTypes } from 'sequelize';
import db from "../database/connection";
import Ingreso from './ingreso';
import Producto from './producto';

const DetalleIngreso = db.define('DetalleIngreso', {
    id_detalleIngreso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    deti_cantidad: {
        type: DataTypes.INTEGER
    },

    deti_precioCompra: {
        type: DataTypes.DECIMAL
    },
    deti_subTotal: {
        type: DataTypes.DECIMAL
    },
    deti_total: {
        type: DataTypes.DECIMAL
    },
    deti_precioVenta: {
        type: DataTypes.DECIMAL
    },
    fk_id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'id_Producto'
        }
    },
    fk_id_ingreso: {
        type: DataTypes.INTEGER,
        references: {
            model: Ingreso,
            key: 'id_ingreso'
        }
    },

    // createdAt: {
    //     type: DataTypes.DATE
    // },

    // updatedAt: {
    //     type: DataTypes.DATE
    // }

});
DetalleIngreso.belongsTo(Producto, {
    as: 'Productos',
    foreignKey: "fk_id_producto"
});

DetalleIngreso.belongsTo(Ingreso, {
    as: 'Ingresos',
    foreignKey: "fk_id_ingreso"
});

export default DetalleIngreso;