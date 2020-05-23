import React, { Fragment,useEffect,useContext} from 'react'
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import Repos from '../repos/Repos';
import GitHubContext from '../../context/github/GitHubContext';
const User = ({match}) => {
    
    const githubContext = useContext(GitHubContext);
    const {getUser,loading,user,repos,getUserRepos} = githubContext;
    // use the empty [] to run useEffect once
    useEffect(()=>{
        // this matches the request /:login
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    },[])


        const {
            name,
            avatar_url,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            company,
            location,
            hireable
        } = user;

        if(loading) return <Spinner/>;
        
        return (
            <Fragment>
                <Link to='/' className="btn btn-light">
                    Back to Search
                </Link>
                Hireable:{' '}
                {hireable? <i className="fas fa-check text-success"/>:<i className="fas fa-times-circle text-danger"/>}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url}
                        className="round-img"
                        alt=""
                        style={{width:'150px'}}
                        />
                    <h1>{name}</h1>
                    <p>Location: {!location?'Its a mystery':location}</p>
                    </div>
                    <div>
                        {bio && <Fragment>
                            <h3>Biography</h3>
                            <p>{bio}</p>
                        </Fragment>}
                        <a href={html_url} className="btn btn-dark my-1">
                            Visit Github Profile
                        </a>
                        <ul>
                            <li>{login && <Fragment>
                                <strong>Username:</strong>{login}
                            </Fragment>}</li>
                            <li>{blog && <Fragment>
                                <strong>Website:</strong>{blog}
                            </Fragment>}</li>
                            <li>{company && <Fragment>
                                <strong>Company:</strong>{company}
                            </Fragment>}</li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public gists: {public_gists}</div>
                </div>
            <Repos repos={repos}/>
            </Fragment>
            )
        
        
    
}




export default User;
