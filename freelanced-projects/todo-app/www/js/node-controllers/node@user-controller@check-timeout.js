/**
 * Created by Belal on 7/20/2016.
 */

/**
 * this function responds to checkTimeOut route and it keeps decremnting the passed to guarantee that everything
 * is working in bidirection(db<->memory).
 * @param app -> the up&running app
 * @param db -> the current db instance.
 */
module.exports = function(app, db){
    app.post('/checkTimeout', function (req, res) {
        var userId = JSON.parse(req.body['userId']);
        var todoName = JSON.parse(req.body['todo']);
        var todoTimeout = JSON.parse(req.body['timeOut']);
        var pageSignature = req.body['flag'];


        if(pageSignature == 'todo') {
            db.query("UPDATE todos SET todos.timeOut = ? WHERE todos.users_id = ? AND todos.name = ?", [todoTimeout, userId, todoName], function (err, rows) {
                return res.json(" ");
            });
        } else if(pageSignature == 'anonymous'){
            db.query("UPDATE todos SET todos.timeOut = ? WHERE todos.users_id = ? AND todos.name = ?", [todoTimeout, 17, todoName], function (err, rows) {
                return res.json(" ");
            });
        }
    });
};