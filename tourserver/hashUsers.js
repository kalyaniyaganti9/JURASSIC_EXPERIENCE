const fs = require('fs');
const bcrypt = require('bcryptjs');
const users = require('./usersTours.json');
let nRounds = 12;
let hashedUsers = [];
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log(time);
console.log(`Starting password hashing with nRounds = ${nRounds}, ${today}`);
let salt = bcrypt.genSaltSync(nRounds);
users.map((data ,i) => { 
	let passHash = bcrypt.hashSync(data['password'],salt);
	let newusers = {
		"firstName": data.firstName,
		"lastName": data.lastName,
		"email": email= data.email,
		"password": passHash,
		"role": data.role
	}
    hashedUsers.push(newusers);
    });
let elapsed = new Date() - today;
//var time2 = elapsed.getHours() + ":" + elapsed.getMinutes() + ":" + elapsed.getSeconds();
//console.log(time2);
console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
//let elapsedSeconds = Math.abs(Math.round((today.getTime() - elapsed.getTime())/1000));
//console.log(`Finished password hashing, ${elapsedSeconds} seconds.`);
fs.writeFileSync("userTourHash.json", JSON.stringify(hashedUsers, null, 2));