/**
 * Created by Belal on 7/26/2016.
 */

module.exports = function (app, db) {
    app.get('/getActivityLog', function(req, res){
        db.query("SELECT history FROM activities ORDER BY idactivity", function(err, rows){
            return res.json(rows);
        })
    });
};
