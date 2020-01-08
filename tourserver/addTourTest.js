//const DataStore = require('nedb');
//const tourdb = new DataStore({filename: __dirname + '/toursDB', autoload: true});
const rp = require('request-promise-native');
let cookieJar = rp.jar();
let add = {
    uri: 'http://127.73.78.1:5260/tours',
    method: 'POST', 
    body: {
            "name" : " new ",
            "date" : "15April, 2020"
            },
    json: true,
    resolveWithFullResponse: true,
	jar:cookieJar
};

let get ={
	uri: 'http://127.73.78.1:5260/tours',
    method:'GET', 
    json: true,
    resolveWithFullResponse: true,
	jar:cookieJar
};
	

let adminlogin = {
	uri: 'http://127.73.78.1:5260/login',
	method: 'POST', 
	body: {
		"email": "sided1830@outlook.com",
		"password": "C}m8\"L,F"
	},
	json: true,
	resolveWithFullResponse: true,
	jar:cookieJar
};

let customerlogin = {
	uri: 'http://127.73.78.1:5260/login',
	method: 'POST', 
	body: {
		"email": "sylvan2059@live.com",
         "password": "1wQX_lYt"
	},
	json: true,
	resolveWithFullResponse: true,
	jar:cookieJar
};

let logout = {
	uri: 'http://127.73.78.1:5260/logout' ,
	method: 'GET',
	json: true,
	resolveWithFullResponse: true,
	jar : cookieJar
};

let del = {
	uri: 'http://127.73.78.1:5260/tours/4k4XDhYoxlCjP2nZ',
    method:'DELETE',
    json: true,
    resolveWithFullResponse: true,
	jar:cookieJar
};

async function someTests() {
	
	console.log("Test 1: Admin login add Tour")
	try {
		let res1 = await rp(adminlogin);
		console.log(`Admin Login Test result: ${JSON.stringify(res1.body)}`);
		console.log(`After Admin login cookies: ${cookieJar.getCookieString(adminlogin.uri)}`);
		
		let resget = await rp(get);
		console.log(`admin visit number of tours: ${resget.body.length}`);
		
		let res2 = await rp(add);
		//console.log(`Add Tour result: ${JSON.stringify(res2.body)}\n`);
		
		
		let resget2 = await rp(get);
		console.log(`admin tourtest number of tours: ${resget2.body.length}`);
			
			
		let res3 = await rp(logout);
			//console.log(`logout result: ${JSON.stringify(res3.body)}`);
			console.log(`After logout cookies: ${cookieJar.getCookieString(logout.uri)}`);	
	} catch (e) {
		console.log(`Error: ${e}\n`);
	}
	
	console.log("Test 2:Customer add tour")
	try {
		let res1 = await rp(customerlogin);
		console.log(`customer Login Test result: ${JSON.stringify(res1.body)}`);
		console.log(`After customer login cookies: ${cookieJar.getCookieString(customerlogin.uri)}`);
		
		let resget = await rp(get);
		console.log(`customer visit number of tours: ${resget.body.length}`);
		
		let res2 = await rp(add);
		console.log(`Add Tour result: ${JSON.stringify(res2.body)}\n`);
		
		
		let resget2 = await rp(get);
		console.log(`customer tourtest number of tours: ${resget2.body.length}`);
			
			
		let res3 = await rp(logout);
			//console.log(`logout result: ${JSON.stringify(res3.body)}`);
			console.log(`After logout cookies: ${cookieJar.getCookieString(logout.uri)}`);	
		
		
		
	} catch (e) {
		console.log(`customer add tour error: ${e}\n`);
	}
	
	console.log("Test 3: Guest add tour");
	try {
		 let resget = await rp(get);
		 console.log(`Guest visit number of tours: ${resget.body.length}`);
		 console.log(`After guest visit cookies: ${cookieJar.getCookieString(get.uri)}`);
		
		 let res2 = await rp(add);
		 console.log(`Add Tour result: ${JSON.stringify(res2.body)}\n`);
	} catch (e) {
		console.log(`Guest add tour Error: ${e}\n`);
	} 
	
	/*console.log("delete test");
	try{
		let res = await rp(adminlogin);
	
		let resget = await rp(get);
		console.log(`admin visit number of tours: ${resget.body.length}`);
		
		let res2 = await rp(del);
		//console.log(`Add Tour result: ${JSON.stringify(res2.body)}\n`);
		
		let resget2 = await rp(get);
		console.log(`admin tourtest number of tours: ${resget2.body.length}`);
	}
	 catch (e) {
		console.log(` delete tour Error: ${e}\n`);
		 console.log(e.body);
	} */
	
	console.log("Test 4: Admin login delete Tour")
	
	try {
		let res1 = await rp(adminlogin);
		console.log(`Admin Login Test result: ${JSON.stringify(res1.body)}`);
		//console.log(`After Admin login cookies: ${cookieJar.getCookieString(adminlogin.uri)}`);
		
		let resget = await rp(get);
		console.log(`admin visit number of tours: ${resget.body.length}`);
		
		let res2 = await rp(del);
		console.log(`del Tour result: ${JSON.stringify(res2.body)}\n`);
		
		
		let resget2 = await rp(get);
		console.log(`admin tourtest number of tours: ${resget2.body.length}`);
			
			
		let res3 = await rp(logout);
			//console.log(`logout result: ${JSON.stringify(res3.body)}`);
			console.log(`After logout cookies: ${cookieJar.getCookieString(logout.uri)}`);	
	} catch (e) {
		console.log(`Error: ${e}\n`);
	} 
	
}

someTests();




