import { Sequelize } from "sequelize";

<<<<<<< HEAD


const db = new Sequelize('bd_new_segunda' , 'root', '', {
=======
const db = new Sequelize('bdtelenor' , 'root', '', {
>>>>>>> 0a3008ceb112d24640575c99641a47bc1ac5cc64
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
    //logggin: false,
});

export default db;