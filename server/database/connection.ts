import { Sequelize } from "sequelize";

const db = new Sequelize('bdtelenor' , 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // port: 3307,
    // logggin: false,
});

//PRO

// const db = new Sequelize(process.env.DB_DATABASE||'nrsi45pnjgylc4wv' , process.env.DB_USER||'u03804lj5kn69i3t', process.env.DB_PASSORD||'skx7rs5pgfpq5tr5', {
//     host: process.env.DB_HOST||'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//     dialect: 'mysql',
//     logging: true,
//     // port: 3307,
// });

<<<<<<< HEAD
//DEV ÑAÑO

// const db = new Sequelize(process.env.DB_DATABASE || 'bd_new_segunda' ,process.env.DB_USER || 'root', '', {
//     host: process.env.DB_HOST ||'localhost',
//     dialect:'mysql',
//     port: 3307,
// });
=======

const db = new Sequelize(process.env.DB_DATABASE || 'bd_new_segunda' ,process.env.DB_USER || 'root', '', {
    host: process.env.DB_HOST ||'localhost',
    dialect:'mysql',
    port: 3307,
});
>>>>>>> 83f89c76673068361ba11fe30f83e4c26633e840

export default db;