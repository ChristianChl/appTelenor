import { Sequelize } from "sequelize";

<<<<<<< HEAD
const db = new Sequelize('bdtelenor' , 'root', '', {
=======
const db = new Sequelize('bd_new_segunda' , 'root', '', {
>>>>>>> 33c54ec0bd855584771c2fac1391b58e6d9bc7ff
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
    //logggin: false,
});

export default db;