module.exports = {
    initConnection: function(mysql) {
        mysqlConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'company'
        });

        mysqlConnection.connect(function(err) {
            return (err || true);
        });

        return mysqlConnection;
    },

    query: function(mysqlConnection, query, onSuccess, onError) {
        if(mysqlConnection){
            mysqlConnection.query(query, function(err, rows) {
                if(err){
                    onError(err);
                } else {
                    onSuccess(rows);
                }
            })
        }
    }
};