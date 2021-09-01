import { DataTypes } from 'sequelize';
import db from "../database/connection";
import Categoria from './categoria';
import Marca from './marca';
import Medida from './medida';
import Tipo from './tipoProducto';
import Usuario from './usuario';

const HistorialProducto = db.define('HistorialProducto', {
    
    id_historial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_producto: {
        type: DataTypes.INTEGER
    },

    hist_caracteristica: {
        type: DataTypes.STRING
    },

    hist_descripcion: {
        type: DataTypes.STRING
    },

    hist_imagen: {
        type: DataTypes.STRING
    },
    hist_modelo: {
        type: DataTypes.STRING
    },
    hist_stock: {
        type: DataTypes.INTEGER
    },
    hist_activo: {
        type: DataTypes.BOOLEAN
    },
    hist_precioVenta: {
        type: DataTypes.FLOAT
    },
    hist_cantVenta: {
        type: DataTypes.INTEGER
    },

    hist_cantCompra: {
        type: DataTypes.INTEGER
    },
    endDate: {
        type: DataTypes.DATE
    },
    fk_id_categoria: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'id_categoria'
        }
    },
    fk_id_marca: {
        type: DataTypes.INTEGER,
        references: {
            model: Marca,
            key: 'id_marca'
        }
    },
    fk_id_medida: {
        type: DataTypes.INTEGER,
        references: {
            model: Medida,
            key: 'id_medida'
        }
    },
    fk_id_tipo: {
        type: DataTypes.INTEGER,
        references: {
            model: Tipo,
            key: 'id_tipo'
        }
    },
    hist_cambioTiempo: {
        type: DataTypes.STRING
    },
    fk_id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    }

});
HistorialProducto.belongsTo(Usuario,{
    as: 'Usuarios',
    foreignKey: "fk_id_usuario"
});
HistorialProducto.belongsTo(Categoria, {
    as: 'Categorias',
    foreignKey: "fk_id_categoria"
})
HistorialProducto.belongsTo(Marca, {
    as: 'Marcas',
    foreignKey: "fk_id_marca"
})
HistorialProducto.belongsTo(Medida, {
    as: 'Medidas',
    foreignKey: "fk_id_medida"
})
HistorialProducto.belongsTo(Tipo, {
    as: 'Tipos', 
    foreignKey: "fk_id_tipo"
})

export default HistorialProducto;