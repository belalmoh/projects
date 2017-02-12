import { expressApp } from './server-configs/express';

var startingApp = new expressApp();

startingApp.setRoutes();
startingApp.startServer();
startingApp.startDatabase();