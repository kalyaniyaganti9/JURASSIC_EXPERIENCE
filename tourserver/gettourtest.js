const rp = require('request-promise-native');
let site = {
			uri: 'http://127.73.78.1:5260/tours' ,
			method: 'GET',
			json: true,
			resolveWithFullResponse: true
		};

rp(site).then(res => {
	var tourarray = res.body;
	tourarray.map((toursdata ,i) => {
		 console.log(`Tour ${i+1} name ${toursdata['name']} ,  date ${toursdata['date']}`);
		  
	 });
	
});