import React, {useState,useContext}from 'react';
import GitHubContext from '../../context/github/GitHubContext';
import AlertContext from '../../context/alert/AlertContext';

const Search = ()=> {
    const githubContext = useContext(GitHubContext);
    const alertcontext = useContext(AlertContext);
    // text is the variable we will refer to kind of like having a separate state as before
    const [text,setText] = useState('');


    const onSubmit = (e) => {
        e.preventDefault();
        if(text === '') {
            alertcontext.setAlert('Please enter something!','light')
        } else  {
            githubContext.searchUsers(text);
            setText('')
        }
    }


    const onChange = e => setText(e.target.value);
    
    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" 
                    name="text" 
                    placeholder="Search Users ..." 
                    value={text} 
                    onChange={onChange} />
                <input type="submit"
                    value="Search" 
                    className="btn btn-dark btn-block" />        
            </form>
            {githubContext.users.length > 0 && (<button className="btn btn-light btn-block" 
            onClick={githubContext.clearUsers}> 
            Clear Users</button>)}
        </div>
    )
}


export default Search;
