import { MySql } from './database';
import * as express from 'express';
import * as bodyParser from "body-parser"

import { CONFIGS } from './config';

export class expressApp {
    private App: express.Express;
    private responseMessage = {
        success: {
            title: "Success",
            message: ""
        },
        failure: {
            title: "Failed",
            message: ""
        }
    }

    constructor() {
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

    setRoutes() {
        this.App.get('/', function (req: express.Request, res: express.Response) {
            res.send("");
        });

        this.App.post('/signin', function (req: express.Request, res: express.Response) {

        });

        this.App.post('/signup', function (req: express.Request, res: express.Response) {
            MySql.getInstance().query(`
            INSERT INTO todoapp.users
            VALUES (NULL, '${req.body.userName}', '${req.body.userEmail}', '${req.body.userPassword}', NULL);
            `, function(successResponse){
                res.json(({statusId: CONFIGS.messageResponse.success.Id, message: {body: CONFIGS.messageResponse.success.Body = "Successfully Registered.", title: CONFIGS.messageResponse.success.Title}}));
            }, function(errorResponse){
                if(errorResponse.code === 'ER_DUP_ENTRY'){
                    res.json(({statusId: CONFIGS.messageResponse.failure.Id, message: {body: CONFIGS.messageResponse.failure.Body = "This email already exists.", title: CONFIGS.messageResponse.failure.Title}}));
                }
            });
        });
    }

    startServer() {
        this.App.listen(CONFIGS.express.port, function () {
            console.log(`Server is running on port ${CONFIGS.express.port}`);
        })
    }

    startDatabase() {
        MySql.getInstance().connect();
    }
}