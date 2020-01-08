const DataStore = require('nedb');
//let userDB = new DataStore(__dirname + '/usersDB');
//let userDB = DataStore.create(__dirname + '/usersDB');
let userDB = new DataStore({filename: __dirname + '/usersDB', autoload: true});
module.exports = userDB;
