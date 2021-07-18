import { Sequelize } from "sequelize";

<<<<<<< HEAD
const db = new Sequelize('bdtelenor' , 'root', '', {
=======
const db = new Sequelize('bd_new_segunda' , 'root', '', {
>>>>>>> 2549093513101feb9dfff3737f48ee5cb1d874eb
    host: 'localhost',
    dialect: 'mysql',
    // port: 3307
    //logggin: false,
});

export default db;