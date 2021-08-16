import { Sequelize } from "sequelize";


const db = new Sequelize('bd_new_segunda' , 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
<<<<<<< HEAD
    // port: 3307,
    //logggin: false,
=======
    port: 3307
>>>>>>> 9cb5141b99c3331b112f2d9e319678d039aa7918
});

export default db;