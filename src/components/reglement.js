import React from "react";
import './componentsStyles/reglementStyle.css';

function Reglement() {


    return (<div className="reglement">
        <h1>Règlement</h1>

        <h3>Doublons</h3>
        <p>Il est interdit de publier plusieurs annonces d’un même livre. Vous devez
         supprimer l’ancienne annonce avant d’en publier une nouvelle.</p>

         <h3>Catégories des annoonces</h3>
        <p>Il est interdit de sélectionner des catégories
         qui ne font pas partit des catégories du livre mis en vente.</p>

         <h3>Services:</h3>
        <p>Les services proposés ou recherchés
         doivent respecter les lois en vigueur au Maroc pour chaque profession.</p>

         <h3>Titre de l'annonce:</h3>
        <p>Le titre de l’annonce ne doit contenir que le titre du livre et aucune information personnelle.
         Kotobi.ma se réserve le droit de modifier le titre de l'annonce pour qu'il soit conforme au règlement.</p>

        <h3>Contenu de l'annonce:</h3>
        <p>Le texte des annonces ne doit pas être copié sur une autre annonce d’un même livre.</p>

        <h3>Nombre d'annonces actives par utilisateur:</h3>
        <p>Le nombre d’annonces actives, en même temps, par utilisateur sur Kotobi.ma
        dépend du type d’utilisateur. L’utilisateur particulier a droit a 30 annonces actives en même temps.
        L’utilisateur professionnel a droit a un nombre illimité d’annonces en même temps
        (tant que l’utilisateur reste membre professionnel).</p>

        <h3>Liens:</h3>
        <p>les liens sont interdits sur la platform de Kotobi.ma.</p>

    </div>);
}

export default Reglement;