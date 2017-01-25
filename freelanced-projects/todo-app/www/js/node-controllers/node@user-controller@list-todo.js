/**
 * Created by Belal on 7/20/2016.
 */

/**
 * this function responds to listTodos route and it passes back the todos according to the userid from headers.
 * @param app -> the up&running app
 * @param db -> the current db instance.
 */
module.exports = function (app, db) {
    app.post('/listTodos', function (req, res) {
        var userId = JSON.parse(req.body['userId']);
        var pageSignature = req.body['flag'];

        if(pageSignature == 'todo') {
            db.query("SELECT todos.name, todos.status, todos.id, todos.timeOut FROM todos WHERE todos.users_id = ?", [userId], function (err, rows) {
                return res.json(rows);
            });
        } else if(pageSignature == 'anonymous'){
            db.query("SELECT todos.name, todos.status, todos.id, todos.timeOut FROM todos WHERE todos.users_id = ?", [17], function (err, rows) {
                return res.json(rows);
            });
        }
    });
};