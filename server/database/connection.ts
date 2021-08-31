import { Sequelize } from "sequelize";
// const db = new Sequelize('bdtelenor' , 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
    // port: 3307,
    //logggin: false,
// });

// const db = new Sequelize('nrsi45pnjgylc4wv' , 'u03804lj5kn69i3t', 'skx7rs5pgfpq5tr5', {
//     host: 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//     dialect: 'mysql',
//     logging: true,
//     // port: 3307,
// });



const db = new Sequelize('bd_new_segunda' , 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    // logggin: false,
});

export default db;