import { Sequelize } from "sequelize";



const db = new Sequelize(process.env.DB_DATABASE || 'bd_new_segunda' ,process.env.DB_USER || 'root', '', {
    host: process.env.DB_HOST ||'localhost',
    dialect:'mysql',
    port: 3307,

});

export default db;