import { Sequelize } from "sequelize";


<<<<<<< HEAD
const db = new Sequelize(process.env.DB_DATABASE || 'bd_new_segunda' ,process.env.DB_USER || 'root', '', {
    host: process.env.DB_HOST ||'localhost',
    dialect:'mysql',
    //port: 3307,
=======
const db = new Sequelize('bdtelenor' , 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // port: 3307,
>>>>>>> e800c225348e8e64fae467e5c1fe17e3231e74e1
    //logggin: false,
});

export default db;