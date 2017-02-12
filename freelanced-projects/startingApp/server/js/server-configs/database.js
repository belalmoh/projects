"use strict";
var config_1 = require("./config");
// import * as mysql from 'mysql';
var mysql = require("mysql");
var MySql = (function () {
    function MySql() {
        this.isConnected = false;
        if (MySql._instance) {
            throw new Error("Error: Instantiation failed: Use MySql.getInstance() instead of new.");
        }
        this.connectionConfig = {
            host: config_1.CONFIGS.database.host,
            user: config_1.CONFIGS.database.user,
            password: config_1.CONFIGS.database.password,
            database: config_1.CONFIGS.database.database
        };
        MySql._instance = this;
    }
    MySql.getInstance = function () {
        return MySql._instance;
    };
    MySql.prototype.connect = function () {
        var _this = this;
        this.connection = mysql.createConnection(this.connectionConfig);
        this.connection.connect(function (err) {
            if (err) {
                _this.isConnected = false;
            }
            _this.isConnected = true;
        });
    };
    MySql.prototype.query = function (statement, successResponse, errorResponse) {
        MySql._instance.connection.query(statement, function (err, rows, fields) {
            if (err) {
                errorResponse(err);
            }
            else {
                successResponse(rows);
            }
        });
    };
    return MySql;
}());
MySql._instance = new MySql();
exports.MySql = MySql;
