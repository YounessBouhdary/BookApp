import React from 'react';
import './componentsStyles/warningStyle.css';

function Warning(){
    return (<div className="warning">
        <p>Il faut disposer d'un compte pour créer une annoce</p>
        <a href="/login">Créer un compte</a>
    </div>
    );
}

export default Warning;