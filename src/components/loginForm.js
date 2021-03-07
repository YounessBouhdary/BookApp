import React, {useState} from 'react';
import './componentsStyles/loginFormStyle.css';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

function LoginForm(){

    let history = useHistory();

    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e)=>{
        e.preventDefault();

        let user = {
            username: username,
            password: password
        }
        Axios.post('https://kotobima.herokuapp.com/userLogin', user).then(()=>{
            window.location.reload();
        });       
    };


    return (<div className="login">
        <div className="Signup_logoPart" style={{marginTop: 50}}>
            <img
                className="signupImage"
                src="./images/logo.png"
            />
            <p id="Signup_logo">Kotobi<span className="ma">.ma</span></p>
            <p className="Signup_logoDesc" style={{marginTop:30, margin: 'auto', width:130}}>Se Connecter</p>
        </div>
        <form style={{marginTop: 50}}>
            <label>
                NOM D'UTILISATEUR:
                <input autoFocus="true" className="loginInputs" type="text" onChange={(e)=>{setusername(e.target.value)}}/>
            </label>
            <label>
                MOT DE PASSE:
                <input className="loginInputs" type="password" onChange={(e)=>{setPassword(e.target.value)}} />
            </label>
            <a href="/passwordForgotten" style={{color:"#E5383b", paddingLeft:"40%"}}>Mot de passe oublié?</a>
            <input style={{marginTop: 50}} onClick={onSubmit} id="signupBtn" type="submit" value="Se Connecter" />
        </form>
    </div>);
}

export default LoginForm;
