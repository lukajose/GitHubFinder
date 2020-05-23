import React, {useReducer} from 'react';
import axios from 'axios';
import GitHubContext from './GitHubContext';
import githubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';


// setting credentials for api
var githubClientId;
var githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
    
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    console.log('client:',githubClientSecret);
} else {
    console.log('this shouldnt print');
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GitHubState = props => {


    // setting state
    const initialState = {
        users:[],
        user:{},
        repos:[],
        loading: false
    }
    const [state,dispatch] = useReducer(githubReducer,initialState);

    
    // search users
    const searchUsers = async (text)=> {
        setLoading();
        
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)
        dispatch({
            type:SEARCH_USERS,
            payload:res.data.items
        });
        console.log('state is now:',state);
    };
    
    

    // get user
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
      dispatch({type:GET_USER,payload:res.data})
  }


    // get repos
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
            githubClientId}&client_secret=${githubClientSecret}`)
        dispatch({type:GET_REPOS,payload:res.data})
    }

    // clear users
     // Clear users from state
    const clearUsers = () => {
        setLoading();
        dispatch({type:CLEAR_USERS});
  }

    // set loading
    const setLoading = () => dispatch({type:SET_LOADING});
    console.log('this is state:',state);
    return (
        <GitHubContext.Provider value={{
            users:state.users,
            user:state.user,
            repos:state.repos,
            loading:state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}>
            {props.children}
        </GitHubContext.Provider>
    )
}

export default GitHubState;