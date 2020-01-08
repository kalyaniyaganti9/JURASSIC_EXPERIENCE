const DataStore = require('nedb');
let tourDB = new DataStore({filename: __dirname + '/toursDB', autoload: true});
module.exports = tourDB;
