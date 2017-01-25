/**
 * Created by Belal on 7/19/2016.
 */

/**
 * this function responds to userSignup route registers user into db if not exists, and passes it back.
 * @param app -> the up&running app
 * @param db -> the current db instance.
 */
module.exports = function(app, db){
    app.post('/userSignup', function (req, res) {
        var data = JSON.parse(req.body['serializedUser']);
        db.query("INSERT INTO users VALUES (NULL, ?, ?)", [data.Name, data.Pass] , function(err, rows){
            if(err){
                return res.json("false");
            } else {
                return res.json(rows);
            }
        });
    });
};

