/**
 * Created by Belal on 7/20/2016.
 */

/**
 * this function responds to deleteTodo route and it deletes the passed todo value from db if exists.
 * @param app -> the up&running app
 * @param db -> the current db instance.
 */
module.exports = function (app, db) {
    app.post('/deleteTodo', function (req, res) {
        var userId = JSON.parse(req.body['userId']);
        var userName = JSON.parse(req.body['userName']);
        var todoInfo = JSON.parse(req.body['todoInfo']);
        var pageSignature = req.body['flag'];
        if(pageSignature == 'todo') {
            db.query("DELETE FROM todos WHERE todos.name = ? AND todos.users_id = ? ", [todoInfo, userId], function (err, rows) {

            });
        } else if(pageSignature == 'anonymous'){
            db.query("DELETE FROM todos WHERE todos.name = ? AND todos.users_id = ? ", [todoInfo, 17], function (err, rows) {
            });

            var stmt = "User with name : " + userName + " has deleted " + todoInfo;
            var utc = new Date().toJSON().slice(0,10);

            db.query("INSERT INTO activities VALUES (NULL, ?, ?, ?)", [stmt, utc,userId], function(err, rows){

            });
        }
    });
};