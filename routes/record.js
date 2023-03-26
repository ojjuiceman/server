const express = require("express");

const recordRoutes = express.Router();

//this connects to database
const dbo = require("../db/conn");

//this help convert the idd to objectID
const ObjectId = require("mongodb").ObjectId;

//this gets thee llist of all records
recordRoutes.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect
      .collection("records")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

//this section will help you grab a sinngle record
recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//this section will help u create a new record
recordRoutes.route("/record/add").post(function (req,response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    db_connect.collection("records").insetOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connect
    .collection("records")
    .updateOne(myquery, new values, function (err, res) {
        if (err) throw err;
        console.log("1 documenr updated");
        response.json(res);
    });
});

// this helps delete record

recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;