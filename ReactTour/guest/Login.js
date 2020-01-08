import React from "react";
class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }; 
	this.HandleEmailChange = this.HandleEmailChange.bind(this);
    this.HandlePasswordChange = this.HandlePasswordChange.bind(this);
  }
      
	Login(){
		let user = {email : this.state.email, password: this.state.password};
		let that = this;
		fetch('/login',{
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({"email" : this.state.email, "password" : this.state.password})
		}).then(function(response){
			console.log('Request status code: ', response.statusText, response.status, response.type);
            return response.json();
		}).then(function(response){
			that.props.handleSuccessfulAuth(response.role, {firstname: response.firstName, lastname: response.lastName, email: response.email});
		})
	}
	
	HandleEmailChange(event){
    this.setState({
      email: event.target.value
    });
  }

  HandlePasswordChange(event){
    this.setState({
      password: event.target.value
    });
  }
  render(){
    return (
			 <main className="main">
            <header className="header">
              <h1>Login</h1>
              <div className="grid-container">
                <div className="grid-item rightAlign">Email </div>
                <div className="grid-item leftAlign"><input id="email" className="textinputlength" type="text" onChange={this.HandleEmailChange}/></div>
                <div className="grid-item rightAlign">Password </div>
                <div className="grid-item leftAlign"><input id="password" className="textinputlength" type="password" onChange={this.HandlePasswordChange}/></div>
                <div className="grid-item rightAlign"><button id="signup" className="signupbutton" onClick={this.Login.bind(this)}>Login</button></div>
				<div className="grid-item leftAlign"><span style= {{backgroundColor:"#F0F8FF"}}></span></div>
				</div>
				</header>
 				</main>
        );
  }
}
export default Login;
