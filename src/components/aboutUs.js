import React from "react";
import './componentsStyles/aboutUsStyle.css';

function AboutUS(){


    return (<div className="AboutUS">
        <h1>Kotobi.ma</h1>
        <p><span>Kotobi.ma</span> est une plateforme d'annonces permettant à tout utilisateur de vendre ces livres en créeant des annonces. 
        Ces livres peuvent être de tout type, roman, livre soclaire ou universitaire , et même des document ou des cahiers dont le contenu 
        peut être utile à d'autre utilisateurs.</p>
        <p><span>Kotobi.ma</span>  n'intervient pas dans l'operation de vente / achat entre les differents utilisateurs. Son objectif c'est faire le lien
        entre l'acheter et le vendeur, c'est derniérs peuvent se contacter par numero de telephone qui sera afficher parmis
        les informations du produit désiré.</p>
        <a href="/contactUs">Plus informations...</a>
    </div>);
}

export default AboutUS;