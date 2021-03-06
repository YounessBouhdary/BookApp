import React from 'react';
import './componentsStyles/landingStyle.css';

function Landing() {
    return (<div className='landing'>
        <div className="logoPart">
            <img
                src="./images/logo.png"
                className="d-inline-block align-top"
            />
            <p id="logo">Kotobi<span id="ma">.ma</span></p>
            <p className="logoDesc">Site web dédié à l’achat/vente de livres d'occasion.</p>
        </div>
        <div className="landingText">
            <h1>Bienvenue à <p>Kotobi<span>.ma</span></p></h1>
            <p id="description">Ici Vous pouvez <span>vendre</span> vos livre deja lus,
            <span> acheter</span> d'autres depuis d'autres utilisateurs,
            ou bien <span>faire une demande</span> si le livre désiré n’est pas disponible sur la platforme.</p>
            <div className="landingBtns">
            <a href="/newBook"><button className="btn_1">VENDRE DES LIVRES</button></a>
            <a href='/products'><button className="btn_2">ACHETER DES LIVRES</button></a>
            </div>
            </div>
    </div>);
}

export default Landing;