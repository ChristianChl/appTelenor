"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(process.env.DB_DATABASE || 'bd_new_segunda', process.env.DB_USER || 'root', '', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: 3307,
});
exports.default = db;
//# sourceMappingURL=connection.js.map