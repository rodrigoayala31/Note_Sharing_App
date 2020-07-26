import React from 'react';
// import { Router } from 'react-router';
// import { Route, Link } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import Add from './Add';
// import Dashboard from './Dashboard';
// import Login from './Login';
// import Register from './Register';
// import ForgotPassword from './ForgotPassword';
import App from './App';




ReactDOM.render(<App/>,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
