import { Sequelize } from "sequelize";

const db = new Sequelize('bdTelenor', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //logggin: false,
});

export default db;