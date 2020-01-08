import React from "react";
import ReactDOM from "react-dom";
import Home from "../guest/Home";
import About from "../guest/About";
import Admintours from "./Admintours.js";
import '../styles.css' ;

class AdminApp extends React.Component{
  constructor(props) {
		super(props);
		this.state = {showing: "home"}; 
	}
	changeShow(toShow)
	{
		this.setState({showing: toShow});
	}
	
	logout(){
    this.props.handleLogout();
  }
    render() {
		  
		let menu =	<div className="navigation">
			<nav className="navigationBar">
			<div className="logo">
			<span>JURASSIC EXPERIENCE</span>  
			</div>
			<div className="menu">
			<ul className="ulist" >
			<li className="listItem"><a className="anchor" onClick = {this.changeShow.bind(this, "tourmanagement")}>Tour Management</a></li>
			<li className="listItem"><a className="anchor" onClick = {this.changeShow.bind(this, "customermanagement")}>Customer Management</a></li>
			<li className="listItem"><a className="anchor" onClick = {this.changeShow.bind(this, "about")}>About</a></li>
			<li className="listItem"><a className="anchor" onClick = {this.changeShow.bind(this, "home")}>Home</a></li>
			<li className="listItem"><a className="anchor" onClick = {this.logout.bind(this,)}>Logout</a></li>	
			</ul>
			</div>
			</nav>
            </div>
		let contents = null;
		switch (this.state.showing) {
			case "home":
				contents = <Home />;
				break;
			case "about":
				contents = <About />;
				break;
			case "tourmanagement":
				console.log("admin tour");
				contents = <Admintours />
				break;
			default:
				contents = <main className="main"><h2> {this.state.showing} : Not Implemented yet </h2></main>
		}
       
			return <div>
			{menu}
			<br/>
			<main>
			{contents}
			</main>
			</div>			
		
	}
}

export default AdminApp;