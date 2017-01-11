/**
 * List of inculdes that is needed to run the program perfectly.
 */
var express = require('express');
var http = require("http");
var mysql = require("mysql");
var routes = require('routes');
var path = require('path');
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);

console.log("Server is running on port 3000 w/ sockets");


/**
 * to set the app read json correctly.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
/**
 * this is to request headers that you wish.
 */
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

/**
 * serving paths
 */
app.use(express.static(path.join(__dirname, '../../')));
app.use(express.static(path.join(__dirname, '../../templates/')));

/**
 * this is the default page. by assigning the root to it.
 */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../templates/root.html'));
});


/**
 * responding to this url will lead to loading database automatically if not exists.
 */
app.get('/initDb', function (req, res) {
    var db = Singleton.getInstance();
});

/**
 * this is singleton database instance.
 * @return {{database instance}} -> instance that will be used along data manip process.
 */
var Singleton = (function () {
    var instance;

    function createInstance() {
        /**
         * initializing the connection
         */
        var db = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            multipleStatements : true,
            port : 3306
        });
        db.connect();
        /**
         * if 'USE todoapp' returned false, sql file will be loaded and excuted so that we load the db correctly
         */
        db.query("USE todoapp", function(err, data){
            if(err){
                /**
                 * reading from sql then running the query.
                 */
                fs.readFile('www/js/node-models/todoapp.sql', 'UTF-8', function (err, contents) {
                    db.query(contents);
                });
            }
        });

        return db;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

/**
 * this is the signup response to its request from the url. this to cope with express routes.
 * And we got the .js file itself here to run it
 */

var signUp = require("../node-controllers/node@user-controller@sign-up");
signUp(app, Singleton.getInstance());
/**
 * this is the signin response to its request from the url. this to cope with express routes
 * And we got the .js file itself here to run it
 */
var signIn = require("../node-controllers/node@user-controller@login");
signIn(app, Singleton.getInstance());

/**
 * this is the addtodo response to its request from the url. this to cope with express routes
 * And we got the .js file itself here to run it
 */
var addTodo = require("../node-controllers/node@user-controller@add-todo");
addTodo(app, Singleton.getInstance());

/**
 * this is the deletetodo response to its request from the url. this to cope with express routes
 * And we got the .js file itself here to run it
 */
var deleteTodo = require("../node-controllers/node@user-controller@delete-todo");
deleteTodo(app, Singleton.getInstance());

/**
 * this is the changestatus response to its request from the url. this to cope with express routes
 * And we got the .js file itself here to run it
 */
var changeStatus = require("../node-controllers/node@user-controller@change-status");
changeStatus(app, Singleton.getInstance());

/**
 * this is the listTodos response to its request from the url. this to cope with express routes
 * And we got the .js file itself here to run it
 */
var listTodos = require("../node-controllers/node@user-controller@list-todo");
listTodos(app, Singleton.getInstance());

/**
 * this is the checktimeout response to its request from the url. this to cope with express routes
 * And we got the .js file itself here to run it
 */
var checkTimeout = require("../node-controllers/node@user-controller@check-timeout");
checkTimeout(app, Singleton.getInstance());

var getAcitivityLog = require("../node-controllers/node@activity-log");
getAcitivityLog(app, Singleton.getInstance());

io.on('connection', function(socket){

    socket.on('add', function(data){
        io.emit('addTodo', data);
    });

    socket.on('check', function(data){
        io.emit('checkTodo', data);
    });

    socket.on('delete', function(data){
       io.emit('deleteTodo', data);
    });

    socket.on('logs', function(){
        io.emit('getLog');
    })
});
