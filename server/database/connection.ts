import { Sequelize } from "sequelize";

<<<<<<< HEAD
const db = new Sequelize('bdtelenor' , 'root', '', {
=======
const db = new Sequelize('bd_new_segunda' , 'root', '', {
>>>>>>> 15725386281d412da34f6e7c26d0fae0769d707c
    host: 'localhost',
    dialect: 'mysql',
    // port: 3307
    //logggin: false,
});

export default db;