import { DataTypes } from 'sequelize';
import db from "../database/connection";
import Cotizacion from './cotizacion';
import Producto from './producto';

const DetalleCotizacion = db.define('DetalleCotizacion', {
    id_detalleCotizacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    decoti_cantidad: {
        type: DataTypes.INTEGER
    },

    decoti_precioVenta: {
        type: DataTypes.DECIMAL
    },
    decoti_total:{
        type: DataTypes.DECIMAL
    },
    fk_id_producto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'id_Producto'
        }
    },
    fk_id_cotizacion: {
        type: DataTypes.INTEGER,
        references: {
            model: Cotizacion,
            key: 'id_cotizacion'

        }
    }

});
DetalleCotizacion.belongsTo(Producto, {
    as: 'Productos',
    foreignKey: "fk_id_producto"
});

DetalleCotizacion.belongsTo(Cotizacion, {
    as: 'Cotizacions',
    foreignKey: "fk_id_cotizacion"
});

export default DetalleCotizacion;