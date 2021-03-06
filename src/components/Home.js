import React from 'react';
import Categories from './categories.js';
import Landing from './landing.js';
import Searchbox from './searchBox.js';
import Offers from './offers.js';
import SellLink from './sellLink.js';

function Home(){
    return (<div><Landing />
        <Searchbox />
        <Categories />
        <Offers />
        <SellLink />
    </div>)
}

export default Home;
