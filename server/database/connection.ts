import { Sequelize } from "sequelize";


const db = new Sequelize('bdtelenor' , 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
<<<<<<< HEAD
    // port: 3307
=======
    port: 3307
    
>>>>>>> 14dddfaf1f9c30e874e980489cddbbddca610188
    //logggin: false,
});

export default db;