import { CONFIGS } from './config';
// import * as mysql from 'mysql';

import mysql = require('mysql');

export class MySql {

    private static _instance: MySql = new MySql();

    connectionConfig: mysql.IConnectionConfig;
    connection: any;
    isConnected: boolean = false;

    private constructor() {
        if (MySql._instance) {
            throw new Error("Error: Instantiation failed: Use MySql.getInstance() instead of new.");
        }
        this.connectionConfig = {
            host: CONFIGS.database.host,
            user: CONFIGS.database.user,
            password: CONFIGS.database.password,
            database: CONFIGS.database.database
        };

        MySql._instance = this;
    }

    public static getInstance(): MySql {
        return MySql._instance;
    }

    connect() {
        this.connection = mysql.createConnection(this.connectionConfig);
        this.connection.connect((err) => {
            if (err) {
                this.isConnected = false;
            }
            this.isConnected = true;
        });
    }

    query(statement: String, successResponse, errorResponse){
        MySql._instance.connection.query(statement, function (err, rows, fields){
            if(err){
                errorResponse(err);
            } else {
                successResponse(rows);
            }
        });
    }

}