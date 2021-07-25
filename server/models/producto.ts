import { DataTypes } from 'sequelize';
import db from "../database/connection";
import Categoria from './categoria';
import Marca from './marca';
import Medida from './medida';
import Tipo from './tipoProducto';

const Producto = db.define('Producto', {
    id_Producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    // prod_nombre: {
    //     type: DataTypes.STRING
    // },

    prod_caracteristica: {
        type: DataTypes.STRING
    },

    prod_descripcion: {
        type: DataTypes.STRING
    },

    prod_imagen: {
        type: DataTypes.STRING
    },

    prod_modelo: {
        type: DataTypes.STRING
    },

    
    prod_stock: {
        type: DataTypes.INTEGER
    },
    prod_activo: {
        type: DataTypes.BOOLEAN
    },
    prod_precioVenta: {
        type: DataTypes.FLOAT
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

});

Producto.belongsTo(Categoria, {
    as: 'Categorias',
    foreignKey: "fk_id_categoria"
})
Producto.belongsTo(Marca, {
    as: 'Marcas',
    foreignKey: "fk_id_marca"
})
Producto.belongsTo(Medida, {
    as: 'Medidas',
    foreignKey: "fk_id_medida"
})
Producto.belongsTo(Tipo, {
    as: 'Tipos', 
    foreignKey: "fk_id_tipo"
})

export default Producto;