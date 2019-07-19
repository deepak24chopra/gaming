const objectId = require("mongodb").ObjectId;
const md5 = require('md5');

function signin(req, res) {
    req.db.collection('users').findOne({ email: req.body.email, password: md5(req.body.password) })
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No results found");
            }
            result.emailHash = md5(result.email);
            res.status(200).send(result);
        }).catch(function(error) {
            res.status(500).send("Not Found error");
        });
}

function signup(req, res) {
    let user = { _id: new objectId(), email: req.body.email, name: req.body.name, password: md5(req.body.password), created_at: new Date(), form: 0 };
    //enter validations here
    req.db.collection('users').insertOne(user)
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No result");
            }
            user.emailHash = md5(user.email);
            res.status(200).send(user);
        }).catch(function(error) {
            res.status(500).send("Not Found");
        });
}

function getAll(req, res) {
    let email = req.body.email;
    req.db.collection('users').find({
            email: { $ne: email }
        }).toArray()
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No result");
            }
            res.status(200).send(result);
        }).catch(function(error) {
            res.status(500).send("Not found");
        });
}

module.exports = {
    signin,
    signup,
    getAll
}