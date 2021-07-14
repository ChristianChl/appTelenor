import { DataTypes } from 'sequelize';
import db from "../database/connection";
import Venta from './venta';
import Producto from './producto';

const DetalleVenta = db.define('DetalleVenta', {
    id_detalleVenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    detv_cantidad: {
        type: DataTypes.INTEGER
    },

    detv_precioVenta: {
        type: DataTypes.DECIMAL
    },
    detv_subTotal: {
        type: DataTypes.DECIMAL
    },
    detv_total:{
        type: DataTypes.DECIMAL
    },
    fk_id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'id_Producto'
        }
    },
    fk_id_venta: {
        type: DataTypes.INTEGER,
        references: {
            model: Venta,
            key: 'id_venta'
        }
    },

    // createdAt: {
    //     type: DataTypes.DATE
    // },

    // updatedAt: {
    //     type: DataTypes.DATE
    // }

});
DetalleVenta.belongsTo(Producto, {
    as: 'Productos',
    foreignKey: "fk_id_producto"
});

DetalleVenta.belongsTo(Venta, {
    as: 'Ventas',
    foreignKey: "fk_id_venta"
});

export default DetalleVenta;