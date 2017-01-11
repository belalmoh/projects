/**
 * Created by Belal on 7/20/2016.
 */
/**
 * this function responds to addTodo route and add a todo into database with its passed records.
 * @param app -> the up&running app
 * @param db -> the current db instance.
 */
module.exports = function(app, db){

    app.post('/addTodo', function (req, res) {
        var userId = JSON.parse(req.body['userId']);
        var userName = JSON.parse(req.body['userName']);
        var todoInfo = JSON.parse(req.body['todoInfo']);
        var pageSignature = req.body['flag'];

        if(pageSignature == 'todo') {
            db.query("INSERT INTO todos VALUES (NULL, ?, 0, ?, ?) ", [todoInfo.todoName, todoInfo.todoTimeOut, userId], function (err, rows) {
                if (err == null) {
                    return res.json("add");
                } else {
                    console.log(err);
                    return res.json("duplicate");
                }
            });
        } else if(pageSignature == 'anonymous'){
            db.query("INSERT INTO todos VALUES (NULL, ?, 0, ?, ?) ", [todoInfo.todoName, todoInfo.todoTimeOut, 17], function (err, rows) {
                if (err == null) {
                    return res.json("add");
                } else {
                    console.log(err);
                    return res.json("duplicate");
                }
            });
            var stmt = "User with name : " + userName + " has added " + todoInfo.todoName + " with timeout " + todoInfo.todoTimeOut;
            var utc = new Date().toJSON().slice(0,10);
            db.query("INSERT INTO activities VALUES (NULL, ?, ?, ?)", [stmt, utc,userId], function(err, rows){

            });
        }

    });
};