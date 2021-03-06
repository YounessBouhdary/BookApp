import React, {  useState, useEffect } from 'react';

import './componentsStyles/offersStyle.css';
import Axios from "axios";

function Responsive() {



    const [productsArray, setProductsArray] = useState([]);

    useEffect(() => {
        const url = "https://kotobima.herokuapp.com/lastProducts"
        Axios.get(url).then((response) => {
            setProductsArray(response.data);
        })
    }, []);


    return (
        <div className="offers">
            <h2>Les annonces les plus récentes</h2>

            <div className="items">
                {productsArray.map((item, idx) =>
                    <a key={idx} href={"\product?id=" + item.book_id}>
                        <div className="singleOffer">
                            <img src={item.imgPath}></img>
                            <h3>{item.title}</h3>
                            <h4>{item.price} DH</h4>
                        </div>
                    </a>

                )}
            </div>

        </div>
    );
}

export default Responsive;