import { Sequelize } from "sequelize";

const db = new Sequelize('bd_telenor', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
    //logggin: false,
});

export default db;