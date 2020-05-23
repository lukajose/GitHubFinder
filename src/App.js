import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import User from './components/users/User';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import About from './components/pages/About';
import GitHubState from './context/github/GitHubState';
import AlertState from './context/alert/AlertState';
import Home  from './components/pages/Home';
import NotFound  from './components/pages/NotFound';


const App  = () => {
  
  return (
    <GitHubState>
      <AlertState>
        <Router>
        <div className="app">
          <Navbar/>
          <div class="container">
            <Alert/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/about' component={About}/>
              <Route exact  path='/user/:login' render={props=>(
                <User {...props}/>
              )}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
        </Router>
      </AlertState>
    </GitHubState>
  );
}

export default App;
