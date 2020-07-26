import React from "react";
import firebase from './config/firebase-config'
import './Login.css'
// import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event, key) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleLogin(event) {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      alert(error);
    })
  }

  render() {

    // if (this.props.loggedIn) {
    //   return <Redirect to='/Dashboard' />
    // }

    return (
      <div className="login-page">
        <div className="login-form-wrapper">
          <h1 className='title-sign-in'>Sign In</h1>
          <p className='paragraph-login'>Access your Note Sharing account</p>
          <form className="login-form" onSubmit={this.handleLogin}>
            <input type="text" placeholder="Email Address" value={this.state.email} onChange={event => this.handleChange(event, "email")}/>
            <input type="password" placeholder="Password" value={this.state.password} onChange={event => this.handleChange(event, "password")}/>
            <button type='submit'>Sign In</button>
            <div className='link-forgot-password'>
              <a href="/ForgotPassword">Forgot your password?</a>
            </div>
            <div className='text-center'>
              <p className="message">Not registered? <a href="/Register">Create an account</a></p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
