import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faFlask, faTag, faClock, faAmericanSignLanguageInterpreting, faSearch, faList, faMapMarkedAlt, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import './componentsStyles/productspageStyle.css';
import Axios from "axios";
import './componentsStyles/searchboxStyle.css';
import './componentsStyles/pagination.css';

function SchoolProductsList(props) {

    const [currentPage, setCurrentPage] = useState(0);

    const [numberOfProducts, setNumberOfProducts] = useState();
    const citys = ["Marrakech", "Casablanca", "Rabat", "Fes", "Agadir", "Tanger", "Tetouan", "Meknes",
        "Tetouan", "El Jadida", "Safi", "Ouarzazate", "Oujda",
        "Settat", "Berrechid", "Chefchaouen", "Salé", "Knitra", "Taza", "Ifran", "Nador", "El hoceima", "Taroudant"
        , "Dakhla", "Errachidia", "Mohammadia", "Laayone", "Ifrane", "Autre"].sort();

    const subjects = ["Mathématiques", "Physique et Chimie", "Science Vie et de terre",
        "histoire géographie", "Français", "Anglais", "Arabe", "Allemand",
        "Éducation Islamique", "Musique", "philosophie", "économie", "Comptabilité",
        "Informatique", "éducation artistique", "Autre"].sort();

    const levels = ["1ère Année Primaire", "2ème Année Primaire", "3ème Année Primaire",
        "4ème Année Primaire", "5ème Année Primaire", "6ème Année Primaire",
        "1ère Année du Collège", "2ème Année du Collège", "3ème Année du Collège",
        "Tronc Commun", "1ère Année du baccalauréat", "2ème Année du baccalauréat"];

    function getQueryStringValue(key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    let cityInit = "";
    if (getQueryStringValue("city") !== "") {
        cityInit = getQueryStringValue("city");
    } else {
        cityInit = "allCitys";
    }
    let subjectInit = "";
    if (getQueryStringValue("categorie") !== "") {
        subjectInit = getQueryStringValue("categorie");
    } else {
        subjectInit = "allSubjects";
    }
    let titleInit = "";
    if (getQueryStringValue("title") !== "") {
        titleInit = "&title=" + getQueryStringValue("title");
    } else {
        titleInit = "&title=";
    }

    const [productsArray, setProductsArray] = useState([]);
    const [orderBy, setOrderBy] = useState("date");
    const [title, setTitle] = useState(titleInit);
    const [city, SetCity] = useState(cityInit);
    const [subject, setSubject] = useState(subjectInit);
    const [level, setLevel] = useState("allLevels");
    const [states, SetStates] = useState({
        string: '"neuf","comme_neuf","bon_etat","acceptable"',
        array: []
    });



    const [languages, SetLanguages] = useState({
        string: '"arabe","français","anglais","espagnol","allemand"',
        array: []
    });



    const [url, setUrl] = useState("https://kotobima.herokuapp.com/school_productslist/" + orderBy + "?page=" + currentPage + "&city=" + city + "&subject=" + subject + "&states=" + states.string + "&languages=" + languages.string + "&level=" + level + title);

    Axios.defaults.withCredentials = true;

    useEffect(() => {

        Axios.get(url).then((response) => {
            setNumberOfProducts(response.data.length);


            setProductsArray(response.data);
            if (response.data.length === 0) {
                setCurrentPage(0);
                if (currentPage > 0) {
                    setUrl(url.replace("page=" + currentPage, "page=" + String(currentPage - 1)));
                } else {
                    setUrl(url.replace("page=" + currentPage, "page=0"));
                }

            }
        })
    }, [url]);


    const changePage = (e) => {
        if (e.target.id === "prev" && currentPage > 0) {
            setUrl(url.replace("page=" + currentPage, "page=" + String(currentPage - 1)));
            setCurrentPage(currentPage - 1);
        } else if (e.target.id === "next" && numberOfProducts === 2) {
            setUrl(url.replace("page=" + currentPage, "page=" + String(currentPage + 1)));
            setCurrentPage(currentPage + 1);
        }

    }

    const handleChange = (e) => {

        if (e.target.name === "order") {
            if (e.target.value !== orderBy) {
                setOrderBy(e.target.value);
                if (e.target.value === "date") {
                    setUrl(url.replace("price", "date"));
                } else {
                    setUrl(url.replace("date", "price"))
                }
            }
        }
        if (e.target.name === "city") {
            setUrl(url.replace(city, e.target.value));
            SetCity(e.target.value);

        }
        if (e.target.name === "subject") {
            setUrl(url.replace(subject, e.target.value));
            setSubject(e.target.value);

        }
        if (e.target.name === "level") {
            setUrl(url.replace(level, e.target.value));
            setLevel(e.target.value);
        }
        if (e.target.name === "states") {
            let st = {
                string: states.string,
                array: states.array
            }
            if (states.array.includes(e.target.value)) {
                st.array = states.array.filter(a => a !== e.target.value);
            } else {
                st.array.push(e.target.value);
            }

            st.string = "";
            st.array.forEach(element => {
                st.string += '"' + element + '",';
            });
            if (st.string === "") {
                st.string = '"neuf","comme_neuf","bon_etat","acceptable""';
            }
            st.string = st.string.slice(0, -1);
            setUrl(url.replace(states.string, st.string));
            SetStates(st);
        }

        if (e.target.name === "language") {
            let lg = {
                string: languages.string,
                array: languages.array
            }
            if (languages.array.includes(e.target.value)) {
                lg.array = languages.array.filter(a => a !== e.target.value);
            } else {
                lg.array.push(e.target.value);
            }

            lg.string = "";
            lg.array.forEach(element => {
                lg.string += '"' + element + '",';
            });
            if (lg.string === "") {
                lg.string = '"arabe","français","anglais","espagnol","allemand""';
            }
            lg.string = lg.string.slice(0, -1);
            setUrl(url.replace(languages.string, lg.string));
            SetLanguages(lg);
        }
        if (e.target.name === "title") {
            let newTitle = e.target.value.replace(/\s+/g, '_').toLowerCase();
            setUrl(url.replace(title, "&title=" + newTitle));
            setTitle("&title=" + newTitle);

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }



    const itemslist = productsArray.map((product, idx) =>
        <a href={"\product?id=" + product.id} ><div key={idx} className="Product">
            <div className="imageProduct"
                style={{
                    backgroundImage: "url(" + product.imgPath + ")"
                }}
            ></div>
            <div className="Product_info">
                <h4 id={"title_" + idx} className="titleProduct">{product.title}</h4>
                <p id={"price_" + idx} className="priceProduct">{product.price} DH</p>
                <div id={"other_infos" + idx} className="other_infos">
                    <p id={"product_ctg" + idx} className="product_ctg"><FontAwesomeIcon className="iconPrdct" icon={faTag} />{product.subject}</p>
                    <p id={"city" + idx} className="city"><FontAwesomeIcon className="iconPrdct" icon={faMapMarkerAlt} />{product.city}</p>
                    <p><FontAwesomeIcon id="date" className="iconPrdct" icon={faClock} />{product.bookDate}</p>
                </div>
            </div>
        </div></a>
    );


    return (<div id="ProductsList">

        <div className="searchBox">
            <h1>Chercher Un livre</h1>
            <form onSubmit={handleSubmit}>
                <div id="searchbox_upper">
                    <div>
                        <FontAwesomeIcon className="inputIcon" icon={faBookOpen} />
                        <input onChange={handleChange} name="title" className="searchItem" placeholder="Nom du livre..." id="firstInput" type="text" />
                    </div>
                    <div>
                        <FontAwesomeIcon className="inputIcon" icon={faList} />
                        <select name="level" onChange={handleChange} className="searchItem" defaultValue="">
                            <option hidden value="">Niveau Scolaire</option>
                            {levels.map((item, idx) =>
                                <option key={idx} value={(item.toLowerCase())}>{item}</option>)}

                        </select>
                    </div>
                    <div>
                        <FontAwesomeIcon className="inputIcon" icon={faMapMarkedAlt} />
                        <select onChange={handleChange} name="city" className="searchItem" defaultValue="">

                            <option hidden value="">Ville</option>
                            {citys.map((item, idx) =>
                                <option key={idx} value={(item.toLowerCase())}>{item}</option>)}
                            <option value="autre">Autre ...</option>
                        </select>

                    </div>
                    <div>
                        <FontAwesomeIcon className="inputIcon" icon={faFlask} />
                        <select onChange={handleChange} name="subject" className="searchItem" defaultValue="">

                            <option hidden value="">Matière</option>
                            {subjects.map((item, idx) =>
                                <option key={idx} value={(item.toLowerCase())}>{item}</option>)}
                            <option value="autre">Autre ...</option>
                        </select>

                    </div>
                </div>
                <div>

                </div>

                <div id="searchbox_lower">
                    <div className="checkboxes">
                        <h3>Langues: </h3>
                        <label className="checkbox" ><input onChange={handleChange} type="checkbox" name="language" value="arabe" />Arabe</label>
                        <label className="checkbox" ><input onChange={handleChange} type="checkbox" name="language" value="français" />Français</label>
                        <label className="checkbox" ><input onChange={handleChange} type="checkbox" name="language" value="anglais" />Anglais</label>
                        <label className="checkbox" ><input onChange={handleChange} type="checkbox" name="language" value="allemand" />Allemand</label>
                        <label className="checkbox" ><input onChange={handleChange} type="checkbox" name="language" value="espagnol" />espagnol</label>
                    </div>
                    <div className="checkboxes">
                        <h3>Etat: </h3>
                        <label className="checkbox" ><input onChange={handleChange} type="checkbox" name="states" value="neuf" />Neuf</label>
                        <label className="checkbox" ><input onChange={handleChange} type="checkbox" name="states" value="comme_neuf" />Comme neuf</label>
                        <label className="checkbox" ><input onChange={handleChange} type="checkbox" name="states" value="bon_etat" />Bon état</label>
                        <label className="checkbox" ><input onChange={handleChange} type="checkbox" name="states" value="acceptable" />Acceptable</label>
                    </div>
                </div>

                {/* <button type="submit"><FontAwesomeIcon id="searchIcon" icon={faSearch} />Rechercher</button> */}

                <div id="filter" onChange={handleChange}>
                    <p>Tri par: </p>
                    <input type="radio" id="dateFilter" value="date" name="order" />
                    <label htmlFor="huey">Date</label>
                    <input type="radio" id="priceFilter" value="price" name="order" />
                    <label htmlFor="huey">Prix</label>
                </div>
            </form>
            <div className="typesLinks">
                <a href="/products">Bouquains et Romans</a>
                <a href="/universityProducts">Livre Univertaires</a>
                <a href="/lessonNotes">Notes Ce Cours</a>
            </div>
        </div>
        <div id="presentingProducts">
            {itemslist}
            {itemslist.length === 0 && <h1>Aucun livre trouvé :(</h1>}
        </div>
        <div className="pagination">
            <p id="prev" onClick={changePage}>&laquo; Page Précedente</p>
            <p id="next" onClick={changePage}>Page Suivante &raquo;</p>
        </div><br></br>
        <a id="requestLink" href="/requestForm">Demander un livre ou document inexistant sur la plateforme en cliquant ICI</a>
    </div>);
}

export default SchoolProductsList;