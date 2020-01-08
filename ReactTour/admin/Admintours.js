import React from "react";
//import tourData from "../guest/tours.json";

function TourTable(props) {
	let rows = props.table.map((tourDataRow,index) => 								
									 <tr key={index}><td><button onClick={props.delfunc.bind(null,tourDataRow._id)}>Delete</button></td>
									 <td>{tourDataRow.name}</td>
									 <td>{tourDataRow.date}</td>
									 </tr>
									);
return (
	<main className="main">
	<section className="section">
	<header className="header"><h1>Upcoming Tours</h1></header>
	<table className="tourTable">
	<thead key="tourHeader" className="tourTableHeader">
	<tr>
	<th></th>
	<th>Name</th>
	<th>Date</th>
	</tr>
	</thead>
	<tbody className="tourTableBody">
	{rows}
	</tbody>
	</table>
	</section>
	</main>
);}

class Admintours extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tours : [],
			name : "",
			date: "",
		}; 
		this.updatedTourData = [];
		this.HandleNameChange = this.HandleNameChange.bind(this);
		this.HandleDateChange = this.HandleDateChange.bind(this);

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
	HandleNameChange(event){
		this.setState({
			name: event.target.value
		});
	}
	HandleDateChange(event){
		this.setState({
			date: event.target.value
		});
	}
	
	AddTour(){
		let tour = {  name: this.state.name, date: this.state.date  };
		let that=this;
		fetch('/tours',{
			method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(tour)
		}).then(function(response){
			console.log('Request status code: ', response.statusText, response.status);
            return response.json();
		}).then(function(toursnew){
			delete toursnew._id;
			console.log(toursnew);
			let arr = that.state.tours.concat(toursnew);
			console.log(arr);
			that.setState({tours: arr});
		})
		.catch(function(msg){
			console.log("something bad happened: " + msg);
		})
	}
	
	
	/*deleteTour(rowIndex) {
		console.log(`deleting:${rowIndex}`);
		let upChoices = this.updatedTourData.tours.filter(function(data, index){
			if(index === rowIndex)
				return false;
			else
				return true;
		});
		this.updatedTourData.tours = upChoices;
		this.setState({toursData: this.updatedTourData});
	}
	  */
	deleteTour(tour_id){
		console.log(`tour to delete id - ${tour_id}`);
		let that = this;
		fetch(`/tours/${tour_id}`,{
			method: 'DELETE',
		}).then(function(response){
			console.log('Request status code: ', response.statusText, response.status);
			return fetch('/tours');
		}).then(function(response){
			if(response.ok){
				return response.json();
			} else{
				let info = `status code: ${response.status},${response.statusText}`;
				console.log(response);
				return Promise.reject(info);
			}
		}).then(function(tours){
			that.setState({tours: tours});
			console.log('new tours' ,tours);
		})
		.catch(function(msg){
			console.log("something bad happened: " + msg);
		})
	}
	
	
	render(){	
		return (
			<main className="main">
			<section className="section">
			<br/>
		<header className="header"><h3>Add Tour</h3></header>
		<div className="grid-container">
			<div className="grid-item rightAlign">Name </div>
			<div className="grid-item leftAlign"><input id="name" className="textinputlength" type="text" onChange={this.HandleNameChange}/></div>
			<div className="grid-item rightAlign">Date(s)</div>
			<div className="grid-item leftAlign"><input id="date" className="textinputlength" type="text" onChange={this.HandleDateChange}/></div>
			<div className="grid-item rightAlign"><button id="add" className="add" onClick={this.AddTour.bind(this)}>Add</button></div>
			<div className="grid-item leftAlign"><span style= {{backgroundColor:"#F0F8FF"}}></span></div>
		</div>
		<TourTable table={this.state.tours}  delfunc={this.deleteTour.bind(this)}/>
			<br/>
		</section> 
		</main>
		);
	}
}
export default Admintours;
