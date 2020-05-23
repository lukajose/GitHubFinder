import React from 'react'
import {useContext} from 'react';
import AlertContext from '../../context/alert/AlertContext';
const Alert = () => {
    const alertcontext = useContext(AlertContext);
    const {alert} = alertcontext;  
    return ( alert && (
        <div className={`alert alert-${alert.type}`}>
            <i className="fas fa-info-circle"/> {alert.msg}
        </div>
        )
    )
}

export default Alert;