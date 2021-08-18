"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('bdtelenor', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // port: 3307,
    //logggin: false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map