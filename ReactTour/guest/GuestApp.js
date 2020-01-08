import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";
import About from "./About";
import Login from "./Login.js";
import Tours from "./Tours.js";
import '../styles.css' ;

class GuestApp extends React.Component{
  constructor(props) {
		super(props);
		this.state = {showing: "home"}; 
	}
	
	changeShow(toShow)
	{
		this.setState({showing: toShow});
	}
	
	handleSuccessfulAuth(role, user){
		console.log("test login")
    this.props.handleLogin(role, user);
  }
    render() {
		let menu = 
            <div className="navigation">
			<nav className="navigationBar">
			<div className="logo">
			<span>JURASSIC EXPERIENCE</span>  
			</div>
			<div className="menu">
			<ul className="ulist" >
			<li className="listItem"><a className="anchor" onClick = {this.changeShow.bind(this, "comingtours")} >Coming Tours</a></li>
			<li className="listItem"><a className="anchor" onClick = {this.changeShow.bind(this, "login")}>Login</a></li>
			<li className="listItem"><a className="anchor" onClick = {this.changeShow.bind(this, "signup")}>Tour SignUp</a></li>
			<li className="listItem"><a className="anchor" onClick = {this.changeShow.bind(this, "about")}>About</a></li>
			<li className="listItem"><a className="anchor" onClick = {this.changeShow.bind(this, "home")}>Home</a></li>
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
			case "comingtours":
				contents = <Tours />
				break;
			case "login":
				contents = <Login handleSuccessfulAuth={this.handleSuccessfulAuth.bind(this)}/>
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

export default GuestApp;