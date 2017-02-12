"use strict";
var database_1 = require("./database");
var express = require("express");
var bodyParser = require("body-parser");
var config_1 = require("./config");
var expressApp = (function () {
    function expressApp() {
        this.responseMessage = {
            success: {
                title: "Success",
                message: ""
            },
            failure: {
                title: "Failed",
                message: ""
            }
        };
        this.App = express();
        this.App.all('*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        this.App.use(bodyParser.json());
        this.App.use(bodyParser.urlencoded({
            extended: true
        }));
    }
    expressApp.prototype.setRoutes = function () {
        this.App.get('/', function (req, res) {
            res.send("");
        });
        this.App.post('/signin', function (req, res) {
        });
        this.App.post('/signup', function (req, res) {
            database_1.MySql.getInstance().query("\n            INSERT INTO todoapp.users\n            VALUES (NULL, '" + req.body.userName + "', '" + req.body.userEmail + "', '" + req.body.userPassword + "', NULL);\n            ", function (successResponse) {
                res.json(({ statusId: config_1.CONFIGS.messageResponse.success.Id, message: { body: config_1.CONFIGS.messageResponse.success.Body = "Successfully Registered.", title: config_1.CONFIGS.messageResponse.success.Title } }));
            }, function (errorResponse) {
                if (errorResponse.code === 'ER_DUP_ENTRY') {
                    res.json(({ statusId: config_1.CONFIGS.messageResponse.failure.Id, message: { body: config_1.CONFIGS.messageResponse.failure.Body = "This email already exists.", title: config_1.CONFIGS.messageResponse.failure.Title } }));
                }
            });
        });
    };
    expressApp.prototype.startServer = function () {
        this.App.listen(config_1.CONFIGS.express.port, function () {
            console.log("Server is running on port " + config_1.CONFIGS.express.port);
        });
    };
    expressApp.prototype.startDatabase = function () {
        database_1.MySql.getInstance().connect();
    };
    return expressApp;
}());
exports.expressApp = expressApp;
