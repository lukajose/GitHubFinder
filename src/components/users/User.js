import React, { Fragment,Component } from 'react'
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
export class User extends Component {
    
    componentDidMount() {
        // this matches the header of the request /:login
        this.props.getUser(this.props.match.params.login);
        
    }
    
    static propTypes = {
        loading:PropTypes.bool,
        user:PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired

    }
    
    
    render() {
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
            location,
            hireable
        } = this.props.user;
        console.log('user is now:',this.props.user);
        
        const {loading} = this.props;


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
                    </div>
                </div>
            </Fragment>
            )
        
        
    }
}

export default User;
