var db = require('../db/dbConfig');
var jwt = require('jsonwebtoken');

const Model = db.db.model('user', require('../entitiy/User').userShema);

function createUser(access_token) {
    const data = getInfoFromToken(access_token);


    if (checkIfUserExists(data.sub)) {
        console.log("user already exists! updating time")
        Model.updateOne({ u_id: data.sub }, { $set: { last_login: new Date().getTime() } }, function (err, res) {
            if (err) console.log("Error while updating.....", err);
        });
    } else {
        Model.create({
            u_id: data.sub,
            name: data.preferred_username,
            mail: data.email,
            image: "https://www.einfachbacken.de/sites/einfachbacken.de/files/styles/full_width_tablet_4_3/public/2021-04/bananenbrot.jpg?h=7d326bee&itok=xchvD_0f",
            last_login: new Date().getTime()
        }, function (err, res) {
            if (err) console.log("Error while inserting...", err);
        });
    }



}

function checkIfUserExists(u_id) {
    Model.count({ u_id: u_id }, function (err, count) {
        if (err) {
            return 0
        } else {
            return count == 0 ? 0 : 1;
        }
    });
}

function getInfoFromToken(token) {
    var decoded = jwt.decode(token, { complete: true });
    return decoded.payload;
}

module.exports.createUser = createUser;