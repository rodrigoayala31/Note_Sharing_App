import React from 'react';
import { Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// import ReactDOM from 'react-dom';
import './index.css';
// import * as serviceWorker from './serviceWorker';
import Add from './Add';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import firebase from './config/firebase-config';
import {BrowserRouter as Router, Route} from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        this.setState({loggedIn: true});
        } else {
        this.setState({loggedIn: false});
        }
        })
     }

    render() {
        const history = createHistory();

        return(  
        
      <Router history={history}>
        <ul>
          <li>
            <Link to='/Dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/Add'>Add Note</Link>
          </li>
          <li>
            <Link to='/'>Login</Link>
          </li>
          <li>
            <Link to='/Register'>Register</Link>
          </li>
        </ul>
        {/* <Route exact path='/Dashboard'>
          <Dashboard loggedIn={this.state.loggedIn}/>
        </Route>
        <Route path='/Add' component={Add} />
        <Route path='/'>
          <Login loggedIn={this.state.loggedIn}/>
        </Route>
        <Route path='/Register' >
          <Register loggedIn={this.state.loggedIn}/>
        </Route>
        <Route path='/ForgotPassword' component={ForgotPassword} /> */}
          <Route exact path='/' component={Login} />
          <Route path='/Register' component={Register} />
          <Route path='/ForgotPassword' component={ForgotPassword} />
          <Route path='/Dashboard' component={Dashboard} />
          <Route path='/Add' component={Add} />

      </Router>
      )
    }
}

export default App;