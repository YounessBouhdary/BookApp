import React, {useState} from 'react';
import './componentsStyles/footerStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import Modal from 'react-modal';
import LoginForm from './loginForm.js';


function Footer() {


    const [openLogin, setopenLogin] = useState(false);
    


    function loginHandler(){
        setopenLogin(!openLogin);
    }


    return (<div className="footer">

        <div className="importantlinks">
            <ul className="footer-links">
                <li><a href='/'>ACCUEIL</a></li>
                <li><a href='/products'>PRODUITS</a></li>
                <li><a href='/blog'>BLOG</a></li>
                <li><a href='/faq'>F.A.Q.</a></li>
                <li><a href='/reglement'>Réglement</a></li>
                <li><a href='/aboutUs'>A PROPOS</a></li>
                <li><a href='/contactUs'>CONTACTEZ NOUS</a></li>
            </ul>
        </div>
        <div id="flexbox">

            <div id="signUp">
                <a href="/login"><button  id="signup_btn_1">Créer un Compte</button></a>
                <button onClick={loginHandler} id="signup_btn_2">Se Connecter</button>
                
                
                <Modal
                    onRequestClose={loginHandler}
                    className="signupModal"
                    overlayClassName="signupOverlay"
                    isOpen={openLogin}>
                    <button id="modelButtunclose" onClick={loginHandler}>X</button>
                    <LoginForm /> 
                </Modal>
            </div>

            <div id="about">
                <h3>Kotobi.ma, C'est Quoi?</h3>
                <p>Kotobi.ma c'est une plateforme ou les utilisateurs peuvent vendre leurs livres déja utilisés, de toutes catègories,
                à d'autres utilisaeurs, et acheter autres,
                 après que les deux utilisateurs se mettent d'accord sur le prix <a id="info" href="/aboutUs">...Plus d'informations</a></p>
            </div>

            <div id="followUs">
                <p>SUIVEZ NOUS</p>
                <div id="FooterIcons">
                    <a href="#"><FontAwesomeIcon id="socialMediaIcon" icon={faFacebookF} /></a>
                    <a href="#"><FontAwesomeIcon id="socialMediaIcon" icon={faInstagram} /></a>
                    <a href="#"><FontAwesomeIcon id="socialMediaIcon" icon={faGooglePlusG} /></a>
                </div>
            </div>

        </div>

        <p style={{color:"#f7fff7", marginTop:"5px"}}>Copyright &copy; 2020</p>
    </div>);
}

export default Footer;