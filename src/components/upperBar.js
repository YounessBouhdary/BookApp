import React from 'react';
import './componentsStyles/upperBarStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";

function UpperBar(props){

    Axios.defaults.withCredentials = true;

    const logoutHandler = () =>{
        Axios.get("https://kotobima.herokuapp.com/logout");
        window.location.reload();
    };
    
    

    return (<div className="upperBar">
    
         
        

        <div  id="drpdwn" className="dropdown">
         <button id="dropdwnBtn" className="dropbtn">
            <FontAwesomeIcon className="userIcon" icon={faUser} />
            {props.username}
            <FontAwesomeIcon  id="dwnIcon" icon={faCaretDown } />
         </button>
                    
            <div id="dropdwnCnt" href='#' className="dropdown-content">
                <a href="/profile">Voire Mon Profile</a>
                <a onClick={logoutHandler}>Se déconnecter</a>
            </div></div>
        
    
    </div>)
}

export default UpperBar;