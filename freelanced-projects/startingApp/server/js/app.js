"use strict";
var express_1 = require("./server-configs/express");
var startingApp = new express_1.expressApp();
startingApp.setRoutes();
startingApp.startServer();
startingApp.startDatabase();
