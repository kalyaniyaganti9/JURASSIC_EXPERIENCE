const rp = require('request-promise-native');
let cookieJar = rp.jar();
let goodlogin = {
	uri: 'http://127.73.78.1:5260/login',
	method: 'POST', 
	body: {
		"email": "sevennight1836@live.com",
		"password": "o|0$BmZ5"
	},
	json: true,
	resolveWithFullResponse: true,
	jar:cookieJar
};
let tours = {
	uri: 'http://127.73.78.1:5260/tours' ,
	method: 'GET',
	json: true,
	resolveWithFullResponse: true,
	jar : cookieJar
};

let logout = {
	uri: 'http://127.73.78.1:5260/logout' ,
	method: 'GET',
	json: true,
	resolveWithFullResponse: true,
	jar : cookieJar
};

let bademail= {
	uri: 'http://127.73.78.1:5260/login',
	method: 'POST', 
	body: {
		"email": "sevennight1836@live.com13",
		"password": "o|0$BmZ5"
	},
	json: true,
	resolveWithFullResponse: true,
	jar : cookieJar
};

let badpassword = {
	uri: 'http://127.73.78.1:5260/login',
	method: 'POST', 
	body: {
		"email": "sevennight1836@live.com",
		"password": "o|0$BmZ5test"
	},
	json: true,
	resolveWithFullResponse: true,
	jar : cookieJar
};

async function loginTests(){
	try {
		console.log("Login test 1: good Login");
		 let gertours= await rp(tours)
			console.log(`called tour cookies: ${cookieJar.getCookieString(tours.uri)}`);

		let login = await rp(goodlogin);
		console.log(`Good Login Test result: ${JSON.stringify(login.body)}`);
		console.log(`After Good login cookies: ${cookieJar.getCookieString(goodlogin.uri)}`);
		
		
		let logouttest = await rp(logout);
			console.log(`logout result: ${JSON.stringify(logouttest.body)}`);
			console.log(`After logout cookies: ${cookieJar.getCookieString(logout.uri)}`);
	}
	catch (e) {
		console.log(`Error: ${e}\n`);
	}
	try {
		console.log("Login test 2: Bad Email");
		
		
		let gertours2= await rp(tours)
			console.log(`called tour cookies: ${cookieJar.getCookieString(tours.uri)}`);
		
		let login2 = await rp(bademail);
		console.log(`Bad Email Login Error: ${JSON.stringify(login2.body)}`);
		
	}
	catch (e) {
		console.log(`Bad Email Login Error: ${e}\n`);
		console.log(`After login test 2 cookies: ${cookieJar.getCookieString(bademail.uri)}`);
	}
	try {
		console.log("Login test 3: Bad password");
		
		let gertours3= await rp(tours)
		console.log(`called tour cookies: ${cookieJar.getCookieString(tours.uri)}`);
		let login3 = await rp(badpassword);
		console.log(`Bad Password Login Error: ${JSON.stringify(login3.body)}`);
		
	}
	catch (e) {
		console.log(`Bad password Login Error: ${e}\n`);
		console.log(`After login test 3 cookies: ${cookieJar.getCookieString(badpassword.uri)}`);
	} 
}

loginTests();