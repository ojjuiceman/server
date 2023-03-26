const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err,db) {
            //verify validness off ddb ojection
            if (db)
            {
                _db = db.db("employees");
                console.log("succeess ffull connection to mongodb")

            }
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    },
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            