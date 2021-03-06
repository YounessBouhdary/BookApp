import React from 'react';
import './componentsStyles/sellLinkStyle.css';

function SellLink(){
    return(<div className="sellLink">
        <p>Cher utilisateur, si vous avez des <span>livres dont vous n’avez plus besoin.</span> Vous pouvez <span>les vendre</span> en cliquant sur le button ci-dessous.</p>
        <a href="/newBook"><button>Créer une Annonce</button></a>
    </div>);
}

export default SellLink;