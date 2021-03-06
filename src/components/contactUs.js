import React from "react";
import './componentsStyles/contactUs.css';

function ContactUs() {

    return (<div className="ContactUS">
        <h3>Besoin d’aide ?</h3>
        <p>Si vous avez besoin d’assistance ou si vous rencontrez une
        difficulté quelconque, quant à l’utilisation du site,
         veuillez nous contacter via email ou à travers nos réseaux sociaux.</p>

        <h3>La vente au volume ou en gros :</h3>
        <p>Si vous voulez vendre plusieurs livre a la fois (plus de 30 livres),
         veuillez nous contacter pour obtenir un compte professionnel.</p>
        <table>
            <tr>
                <th></th>
                <th>Utilisateur particulier</th>
                <th>Utilisateur professionnel</th>
            </tr>
            <tr>
                <td>Nombre d’annonces autorisés en même temps</td>
                <td>30</td>
                <td>Illimité</td>
            </tr>
            <tr>
                <td>Saisie des information des annonces</td>
                <td>Par l’utilisateur</td>
                <td>Par l’utilisateur ou par l’équipe Kotobi.ma</td>
            </tr>
            <tr>
                <td>Type d'annonce</td>
                <td>Annonce normale</td>
                <td>Annonce vérifiée</td>
            </tr>
            <tr>
                <td>Cout</td>
                <td>Gratuit</td>
                <td>Payant</td>
            </tr>
            </table>
            <h3>Nos Réseau Sociaux</h3>
            <ul>
                <li>Notre page Facebook: ###########</li>
                <li>Notre page Instagram:###########</li>
                <li>Notre page Twitter:###########</li>
            </ul>
            <h3>Site Web Feedback</h3>
            <p>Si vous avez des remarques ourecommandations à nous communiquer,
             veuillez le faire à travers l’email de la platform.</p>
            <h3>Nous contacter:</h3>
            <p id="ourEmail">kotobi.ma.website@gmail.com</p>
        
    </div>)
}

export default ContactUs;