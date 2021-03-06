import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faList, faMapMarkedAlt, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import './componentsStyles/searchboxStyle.css';
import { useHistory } from 'react-router-dom'

function Searchbox() {

    const history = useHistory();

    const citys = ["Marrakech", "Casablanca", "Rabat", "Fes", "Agadir", "Tanger", "Tetouan", "Meknes",
        "Tetouan", "El Jadida", "Safi", "Ouarzazate", "Oujda",
        "Settat", "Berrechid", "Chefchaouen", "Salé", "Knitra", "Taza", "Ifran", "Nador", "El hoceima", "Taroudant"
        , "Dakhla", "Errachidia", "Mohammadia", "Laayone", "Ifrane"].sort();

    const bookTypes = ["Action et Adventure", "Classique", "Bande dessinée", "Mystère", "Fantaisie", "Fiction historique ",
        "Horreur", "Fiction littéraire", "Romance", "science-fiction ", "Biographies et autobiographies",
        "Livres de cuisine", "Histoire", "Mémoire", "Poésie", "Développement Personnel", "Criminalité", "Livres pour enfants",
        "Affaires / économie", "Dictionnaire", "Livres religieux","dictionnaire", "Drame", "Science", "Jeune adulte "].sort();





    const [searchParams, setSearchParams] = useState({
        categorie: "",
        city: "",
        title: ""
    });



    const handleChange = (e) => {
        let searchP = searchParams;
        searchP[e.target.name] = e.target.value;
        setSearchParams(searchP);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        switch (searchParams.categorie) {
            case "livres_scolaires":
                history.push("/schoolProducts?title=" + searchParams.title + "&city=" + searchParams.city);
                break;
            case "livres_universitaires":
                history.push("/universityProducts?title=" + searchParams.title + "&city=" + searchParams.city);
                break;
            case "notes_cours":
                history.push("/lessonNotes?title=" + searchParams.title  + "&city=" + searchParams.city);
                break;
            default:
                history.push("/products?title=" + searchParams.title + "&categorie=" + searchParams.categorie + "&city=" + searchParams.city);
        }
    }

    return (<div className="searchBox">
        <h1>Chercher Un livre</h1>
        <form onSubmit={handleSubmit}>
            <div id="searchbox_upper">
                <div>
                    <FontAwesomeIcon className="inputIcon" icon={faBookOpen} />
                    <input onChange={handleChange} name="title" className="searchItem" placeholder="Nom du livre..." id="firstInput" type="text" />
                </div>
                <div>
                    <FontAwesomeIcon className="inputIcon" icon={faList} />
                    <select name="categorie" onChange={handleChange} className="searchItem" defaultValue="">
                        <option hidden value="">Catègories</option>
                        <optgroup label="Roman et Bouquain">
                            {bookTypes.map((item, idx) =>
                                <option key={idx} value={(item.toLowerCase()).replace(" ","_")}>{item}</option>)}
                                <option value="autre">Autre</option>
                        </optgroup>
                        <optgroup label="Autres Livres:">
                            <option value="livres_scolaires">Livres Scolaires</option>
                            <option value="livres_universitaires">Livres Universitaires</option>
                            <option value="notes_cours">Notes de Cours (Cahiers)</option>
                        </optgroup>


                    </select>
                </div>
                <div>
                    <FontAwesomeIcon className="inputIcon" icon={faMapMarkedAlt} />
                    <select onChange={handleChange} name="city" className="searchItem" defaultValue="">

                        <option hidden value="">Ville</option>
                        {citys.map((item, idx) =>
                            <option key={idx} value={(item.toLowerCase()).replace(" ","_")}>{item}</option>)}
                            <option value="autre">Autre</option>
                    </select>

                </div>
            </div>

            <button type="submit"><FontAwesomeIcon id="searchIcon" icon={faSearch} />Rechercher</button>
        </form>
    </div>)
};


export default Searchbox;