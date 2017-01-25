/**
 * Created by Belal on 7/20/2016.
 */
/**
 * this function responds to changeStatus route and changes status according to the passed flag into header.
 * @param app -> the up&running app
 * @param db -> the current db instance.
 */
module.exports = function (app, db) {
    app.put('/changeStatus', function (req, res) {
        var userId = JSON.parse(req.body['userId']);
        var userName = JSON.parse(req.body['userName']);
        var todoName = JSON.parse(req.body['name']);
        var todoStatus = JSON.parse(req.body['status']);
        var pageSignature = req.body['flag'];


        if(pageSignature == 'todo') {
            db.query("UPDATE todos SET todos.status = ? WHERE todos.users_id = ? AND todos.name = ?", [todoStatus, userId, todoName], function (err, rows) {

            });
        } else if(pageSignature == 'anonymous'){
            db.query("UPDATE todos SET todos.status = ? WHERE todos.users_id = ? AND todos.name = ?", [todoStatus, 17, todoName], function (err, rows) {
            });

            var stmt = "User with name : " + userName + " has changed " + todoName + " with status " + todoStatus;
            var utc = new Date().toJSON().slice(0,10);
            db.query("INSERT INTO activities VALUES (NULL, ?, ?, ?)", [stmt, utc,userId], function(err, rows){

            });
        }
    });
};