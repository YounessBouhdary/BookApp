import React, { useState } from 'react';
import './componentsStyles/categoriesStyle.css';

function Categories() {

    const [hoverArray, sethoverArray] = useState([false, false, false, false, false, false])

    const buttonStyle = {
        height: 150,
        width: 150,
    };
    const catgNameStyle = {
        margin: 'auto',
        width: 260,
        fontSize: 30,
    };
    const imageStyle = {
        height: 80,
        width: 80,
    };



    function hoverOn(index) {
        sethoverArray(prevState => prevState.map((item, idx) => idx === index ? item = true : false))
    }

    function hoverOff(index) {
        sethoverArray(prevState => prevState.map((item, idx) => idx === index ? item = false : false))
    }


    return (<div id="categoriesPart" className="categoriesPart">
        <h1>Les Grandes Catègories</h1>
        <div id="categoriesLignes">
            <div id="categoriesLigne_1">

                <a href="/products">
                    <div className="category" onMouseEnter={() => hoverOn(0)} onMouseLeave={() => hoverOff(0)}>
                        <button style={hoverArray[0] ? buttonStyle : {}}>
                            <img alt="" style={hoverArray[0] ? imageStyle : {}} src="./images/open-book.png" />
                        </button>
                        <p style={hoverArray[0] ? catgNameStyle : {}}>Romans et Nouvelles</p>
                    </div>
                </a>
                <a href="/universityProducts">
                    <div className="category" onMouseEnter={() => hoverOn(1)} onMouseLeave={() => hoverOff(1)}>
                        <button style={hoverArray[1] ? buttonStyle : {}}>
                            <img alt="" style={hoverArray[1] ? imageStyle : {}} src="./images/knowledge.png" />
                        </button>
                        <p style={hoverArray[1] ? catgNameStyle : {}}>Livres Universitaires</p>
                    </div>
                </a>
                <a href="/products?title=&categorie=livres religieux&city=">
                    <div className="category" onMouseEnter={() => hoverOn(2)} onMouseLeave={() => hoverOff(2)}>
                        <button style={hoverArray[2] ? buttonStyle : {}}>
                            <img alt="" style={hoverArray[2] ? imageStyle : {}} src="./images/mosque.png" />
                        </button>
                        <p style={hoverArray[2] ? catgNameStyle : {}}>Livres Religieux</p>
                    </div>
                </a>
            </div>
            <div id="categoriesLigne_2">

                <a href="/products?categorie=livres pour enfants">
                    <div className="category" onMouseEnter={() => hoverOn(3)} onMouseLeave={() => hoverOff(3)}>
                        <button style={hoverArray[3] ? buttonStyle : {}}>
                            <img alt="" style={hoverArray[3] ? imageStyle : {}} src="./images/reading.png" />
                        </button>
                        <p style={hoverArray[3] ? catgNameStyle : {}}>Livres pour Enfants</p>
                    </div>
                </a>
                <a href="/products?categorie=dictionnaire">
                    <div className="category" onMouseEnter={() => hoverOn(4)} onMouseLeave={() => hoverOff(4)}>
                        <button style={hoverArray[4] ? buttonStyle : {}}>
                            <img alt="" style={hoverArray[4] ? imageStyle : {}} src="./images/book.png" />
                        </button>
                        <p style={hoverArray[4] ? catgNameStyle : {}}>Dictionnaire</p>
                    </div>
                </a>
                <a href="/lessonNotes">
                    <div className="category" onMouseEnter={() => hoverOn(5)} onMouseLeave={() => hoverOff(5)}>
                        <button style={hoverArray[5] ? buttonStyle : {}}>
                            <img alt="" style={hoverArray[5] ? imageStyle : {}} src="./images/books.png" />
                        </button>
                        <p style={hoverArray[5] ? catgNameStyle : {}}>Notes de Cours</p>
                    </div>
                </a>
            </div>
        </div>
    </div>);
}

export default Categories;