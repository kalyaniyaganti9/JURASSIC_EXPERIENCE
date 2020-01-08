const app = require('../tourServer');
const assert = require('chai').assert;
const request = require('supertest'); 
const cookie = require('cookie');
const rp = require('request-promise-native');
let cookieJar = rp.jar();

describe('Get Tour Tests', function () {
	let response;
	let tours = null;
	before(async function(){
		response = await request(app).get('/tours');
	})
	it('Everything is OK', async function(){
		assert.equal(response.status, 200);
	});
	it('Returns an array', function(){
		tours = JSON.parse(response.text);
		assert.isArray(tours);
	});
	it('All tour elements have name and date', function(){
		tours.forEach(function(tour){
			assert.containsAllKeys(tour, ['name', 'date']);
		});
	});
	it('Cookie with appropriate name is returned', function(){
		let cookies = response.header['set-cookie'].map(cookie.parse);
		//console.log(cookies);
		let mycookie = cookies.filter(c => c.hasOwnProperty('YZ3852TourSid'));
		assert.notEmpty(mycookie);
	});
})  
describe('Get an individual tour', function (){
	let response;
	let tours = null;
	before(async function(){
		response = await request(app).get('/tours');
		tours = JSON.parse(response.text);
		testId1 = tours[0]._id;
		testId2 = tours[1]._id;
		testId3 = "nonExistingTourID12345";
	})
	it('Get an existing Tour', async function(){
		console.log("trying path /tours/2pf69uABRFlqvYSE");
		const response1= await request(app).get('/tours/'+testId1);
		assert.equal(response1.status, 200);
		assert.containsAllKeys(tours[0], ['name', 'date']);
	});
	it('Get another existing Tour', async function(){
		console.log("trying path /tours/3AggofUwaG8jmTzG");
		const response2= await request(app).get('/tours/'+testId2);
		assert.equal(response2.status, 200);
		assert.containsAllKeys(tours[1], ['name', 'date']);
	});
	it('Get non existing Tour', async function(){
		console.log("trying path /tours/nonExistingTourID12345");
		const response3= await request(app).get('/tours/'+testId3);
		assert.equal(response3.status, 404);
	});
})
describe('Add Tour Tests', function () {
	let dbinit;
	let adminlogin;
	let add;
	let customerlogin;
	this.timeout(10000)
	before(async function(){
		dbinit = require('../tourDBInit');
		//response = await request(app).post('/tours');
		adminlogin = {
			uri: 'http://127.73.78.1:5260/login',
			method: 'POST', 
			body: {
				"email": "sided1830@outlook.com",
				"password": "C}m8L,F"
			},
			json: true,
			resolveWithFullResponse: true,
			jar:cookieJar
		};
		add = {
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

		customerlogin = {
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

	})
	it('Login as admin , add tour', async function(){
		let res1 = await rp(adminlogin);
		console.log(res1.body);
		let res2 = await rp(add);
		assert.equal(res2.statusCode, 200);
	});
	it('customer  , add tour', async function(){
		try {
			let res3 = await rp(customerlogin);
			console.log(res3.body);
			let res4 = await rp(add);
		}
		catch (e) {
			//console.log(e.statusCode);
			console.log(`customer add tour error: ${e}\n`);
			assert.equal(e.statusCode, 401);
		}
	});
	it('guest add tour', async function(){
		try{
			let res5 = await rp(add);			
		}
		catch (e) {
			console.log(`guest add tour error: ${e}\n`);
			assert.equal(e.statusCode, 401);
		}

	});
})  

describe('Delete tour tests', function (){
	let response;
	let dbinit2;
	let adminlogin;
	let del;
	let customerlogin;
	let agent = request.agent(app);
	before(async function(){
		dbinit2 = require('../tourDBInit');
		response = await agent.get('/tours');
		tours = JSON.parse(response.text);
		testId1 = tours[0]._id;
		testId2 = tours[1]._id;
		testId3 = tours[2]._id;
	})
	it('Login as Admin delete tour', async function(){
		let res1 = await agent.post('/login')
		.send({"email": "sided1830@outlook.com",    "password": "C}m8L,F"});
		console.log(res1.body);
		//let res2 = await rp(del);
		let res2= await agent.delete('/tours/'+testId1);
		//console.log(res2.body);
		assert.equal(res2.statusCode, 200);
	});
	it('login as customer delete tour', async function(){
		let res1 = await agent.post('/login')
		.send({"email": "sylvan2059@live.com",    "password": "1wQX_lYt"});
		console.log(res1.body);
		let res2= await agent.delete('/tours/'+testId2);
		//console.log(res2.body);
		assert.equal(res2.statusCode, 401);
	});
	it('guest try to delete tour', async function(){
		const response3= await agent.delete('/tours/'+testId3);
		assert.equal(response3.status, 401);
	});
})

