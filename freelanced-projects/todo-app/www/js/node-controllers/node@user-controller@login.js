/**
 * Created by Belal on 7/20/2016.
 */

/**
 * this function responds to addTodo route and passes back current user data from db.
 * @param app -> the up&running app
 * @param db -> the current db instance.
 */
module.exports = function(app, db){
    app.post('/userLogin', function (req, res) {
        var data = JSON.parse(req.body['serializedUser']);
        db.query("SELECT * FROM users WHERE users.name = ? AND users.pass = ? ", [data.Name, data.Pass] , function(err, rows){
            return res.json(rows);
        });
    });
};