import React from "react";
//import TourTable from "./TourTable";
//import tourData from "./tours.json";

class Tours extends React.Component{
	constructor(props) {
		super(props); // Must call
		// Set up state here
		this.state = {tours : []  };
	}
	componentDidMount(){
		let that = this;
		fetch('/tours')
			.then(function (response){
			if(response.ok){
				return response.json();
			} else{
				let info = `status code: ${response.status},${response.statusText}`;
				console.log(response);
				return Promise.reject(info);
			}
		})
			.then(function(tours){
			that.setState({tours: tours});
			console.log(tours);
		})
			.catch(function(msg){
			console.log("something bad happened: " + msg);
		})
	}
	// Renders component based on current state and props
	render() {
		 let rows = this.state.tours.map((tourDataRow,index) => 								
			<tr key={index}><td>{tourDataRow.name}</td>
			<td>{tourDataRow.date}</td></tr>);
		return (
		<main className="main">
		<section className="section">
		<header className="header"><h1>Upcoming Tours</h1></header>
		<table className="tourTable">
		<thead className="tourTableHeader">
		<tr><td id="table-header">Name</td>
		<td>Date</td></tr> 
		</thead>
		<tbody className="tourTableBody">
		{rows}
		</tbody>
		</table> 
		<br/>
		</section>
		</main>
		);
	}
}

export default Tours;
