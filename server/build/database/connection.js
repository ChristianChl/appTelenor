"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
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
const db = new sequelize_1.Sequelize(process.env.DB_DATABASE || 'nrsi45pnjgylc4wv', process.env.DB_USER || 'u03804lj5kn69i3t', process.env.DB_PASSORD || 'skx7rs5pgfpq5tr5', {
    host: process.env.DB_HOST || 'un0jueuv2mam78uv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
<<<<<<< HEAD
    logging: true,
    // port: 3307,
=======
    port: 3307,
>>>>>>> 61845ae2b9c0b03a25891728fe936c2e32f1cfeb
});
exports.default = db;
//# sourceMappingURL=connection.js.map