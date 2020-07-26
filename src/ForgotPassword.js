import React from "react";
import firebase from './config/firebase-config';
import './ForgotPassword.css';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSendEmail = this.handleSendEmail.bind(this);
  }

  handleChange(event, key) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSendEmail(event) {
    event.preventDefault();
    const email = this.state.email;
    firebase.auth().sendPasswordResetEmail(email).catch(function(error) {
      alert(error);
    })
    this.setState({
      email: '',
    })
  }

  render() {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-form-wrapper">
          <h1>Forgot Password?</h1>
          <p className='light'>Enter the email associated to your account</p>
          <form className="forgot-password-form" onSubmit={this.handleSendEmail}>
            <input type="text" placeholder="Email Address" value={this.state.email} onChange={event => this.handleChange(event, "email")}/>
            <button type='submit'>Send Email</button>
            <p className="message">Remember your password? <a href="/Login">Sign In</a></p>
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;