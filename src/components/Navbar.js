import React, { useState } from 'react';
import './componentsStyles/navbarStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';





function Navbar() {

    const bookTypes = ["Action et Adventure", "Classique", "Fantaisie",
        "Histoire",   "Développement Personnel",  "Livres pour enfants",
         "Dictionnaire", "Livres religieux", "Science"].sort();


    const [navClass, setnavClass] = useState('false'); //open="true" close="false"
    const [style, setStyle] = useState({});

    function toggleHandler() {
        setnavClass(!navClass);
        if (navClass) {
            setStyle({
                clipPath: 'circle(1000px at 90% -10%)',
                WebkitClipPath: 'circle(1000px at 90% -10%)',
                pointerEvents: 'all',
                top: 0,
                marginTop: 0,
                paddingTop: 50
            });
        } else {
            setStyle({});
        }
    }



    return <nav>
        <div onClick={() => { toggleHandler() }} className="hamburger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
        <a href='/' className="logo">

            <img
                src="./images/logo.png"
            />
            <p>Kotobi<span id={"ma"}>.ma</span></p>
        </a>

        <ul style={style} className={"nav-links"}>
            <li><a href='/'>ACCUEIL</a></li>
            <li>
                <div className="dropdown">
                    <button className="dropbtn">CATEGORIES<FontAwesomeIcon style={{ marginLeft: 8 }} icon={faCaretDown} /></button>

                    <div href='#' className="dropdown-content">

                        {bookTypes.map((item, idx) =>
                            <a key={idx} href={"/products?categorie=" + (item.toLowerCase())}>{item}</a>)}
                        <a href="/schoolProducts">Livres Scolaires</a>
                        <a href="/universityProducts">Livres Universitaires</a>
                        <a href="/lessonNotes">Notes de Cours (Cahiers)</a>
                        <a href="/products">Autre</a>
                    </div>
                </div>
            </li>
            <li><a href='/products'>PRODUITS</a></li>
            <li><a href='#'>BLOG</a></li>
            <li><a href='#'>A PROPOS</a></li>
            <li><a style={{ border: "none" }} href="/newBook"><button className="nav_btn">VENDRE VOS LIVRES</button></a></li>
        </ul>

    </nav>
}

export default Navbar;