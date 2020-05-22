import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
//import UserItem from './components/users/UserItem';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import { Fragment } from 'react';
import About from './components/pages/About';




class App extends React.Component {
  state = {
    users:[],
    loading:false,
    text:'',
    alert:null,
    user:{}
  }
  /*
  async componentDidMount() {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users:res.data,loading:false});
  }
  */

  searchUsers = async (text)=> {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users:res.data.items,loading:false});
  }

  // Clear users from state
  clearUsers = () => this.setState({users:[],loading:false});


  // set alert
  setAlert = (msg, type) => {
    this.setState({alert:{msg,type}})
    setTimeout(()=>{ 
      this.setState({alert:null})
    },5000)
  }
  //get user data
  getUser = async (username) => {
    console.log('user is loading:',username);
    this.setState({loading:true});
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({user:res.data,loading:false});
    console.log('userdata:',this.state.user);

  }
  render () {
    const {users,loading,user} = this.state;
    return (
      <Router>
      <div className="app">
        <Navbar/>
        <div class="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                  <Search text={this.state.text}
              searchUsers={this.searchUsers} 
              clearUsers={this.clearUsers}
              showClear={users.length > 0? true:false}
              setAlert={this.setAlert}/>
              <Users loading={loading} users={users}/>
              </Fragment>
              )}/>
              
          <Route exact path='/about' component={About}/>
          <Route exact  path='/user/:login' render={props=>(
            <User {...props} getUser={this.getUser} user={user} loading={loading}/>
          )}/>
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
