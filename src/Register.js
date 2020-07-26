import React from 'react';
import './Register.css'
import firebase from './config/firebase-config'
// import { Redirect } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      collegeName: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(event, key) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSignUp(event) {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      alert(error);
    })
  }

  render() {

    // if (this.props.loggedIn) {
    //   return <Redirect to='/Dashboard' />
    // }

    return (
      <div className="sign-up-page">
        <div className="sign-up-wrapper">
          <h1 className='title-register'>Sign Up</h1>
          <p className='paragraph-sign-up'>Sign up for a new Note Sharing account</p>
          <form onSubmit={this.handleSignUp} className="sign-up-form">
            <input type="text" placeholder="Full Name" value={this.state.fullName} onChange={event => this.handleChange(event, "fullName")}/>
            <input type="text" placeholder="Email Address"  value={this.state.email} onChange={event => this.handleChange(event, "email")}/>
            <input type="text" placeholder="College Name"  value={this.state.collegeName} onChange={event => this.handleChange(event, "collegeName")}/>
            <input type="password" placeholder="Password" value={this.state.password} onChange={event => this.handleChange(event, "password")}/>
            <button type='submit'>Sign Up</button>
            <p className="message">Already have an account? <a href="/">Login</a></p>
          </form>
        </div>
      </div>
    );
  }

}

export default Register;