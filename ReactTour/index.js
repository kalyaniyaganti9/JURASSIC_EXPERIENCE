import React from "react";
import ReactDOM from "react-dom";
import GuestApp from "./guest/GuestApp";
import CustomerApp from "./cust/CustomerApp";
import AdminApp from "./admin/AdminApp";


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {role: "guest", user:""}; 
	}

	handleLogin(role, user){
		this.setState({
			role : role,
			user : user
		});
	}

	/*handleLogout(){
		console.log("log out...");
		this.setState({
			role: "guest",
			user: ""
		});
	} */
	
	
	handleLogout(){
		let that = this;
		fetch('/logout')
			.then(function (response){
			if(response.ok){
				return response.json();
			} else{
				let info = `status code: ${response.status},${response.statusText}`;
				console.log(response);
				return Promise.reject(info);
			}
		})
		   .then(function(msg){
			that.setState({
			role: "guest",
			user: ""
		});
		})
			.catch(function(msg){
			console.log("something bad happened: " + msg);
		})
	}
	
	// Renders component based on current role and props
	render() {
		let contents = null;

		switch (this.state.role) {
			case "guest":
				contents = <GuestApp handleLogin={this.handleLogin.bind(this)}/>;
				break;
			case "customer":
				contents = <CustomerApp handleLogout={this.handleLogout.bind(this)}/>;
				break;
			case "admin":
				contents = <AdminApp handleLogout={this.handleLogout.bind(this)}/>;
				break;
			default:
				contents = <h2>Warning something went wrong!!!</h2>;
		}

		return <div>
			<main>
			{contents}
		</main>
		</div>

	}  		

}
ReactDOM.render(<App />, document.getElementById("root"));

