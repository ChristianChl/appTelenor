import { Sequelize } from "sequelize";


const db = new Sequelize('bdtelenor' , 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
<<<<<<< HEAD
    // port: 3307,
    //logggin: false,

=======
    port: 3307
>>>>>>> dc3c6400d95289446fa783d402068bdcdc95eea4
});

export default db;