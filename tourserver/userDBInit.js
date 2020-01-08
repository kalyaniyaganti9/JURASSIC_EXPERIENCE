///const DataStore = require('nedb-promises');
//const db = DataStore.create(__dirname + '/usersDB');
const userdb = require('./userDBRef');
const users = require('./userTourHash.json');

async function initialize() { // so I can await!
    try {
        let numRemoved = await userdb.remove({}, {multi: true});
        console.log(`Cleanup, removed ${numRemoved} users`);
        let newDocs = await userdb.insert(users);
        console.log(`Added ${newDocs.length} users`);
    } catch (err) {
        console.log(`Database error: ${err}`);
    }
}

initialize(); // don't forget to run the async function
//module.exports = initialize;