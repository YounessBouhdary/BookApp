import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";
import './componentsStyles/profile.css';

function Profile(props) {

    Axios.defaults.withCredentials = true;
    const [user, setUser] = useState({});
    const [books, setBooks] = useState([]);

    useEffect(() => {
        Axios.get("https://kotobima.herokuapp.com/profile").then((response) => {
            setUser(response.data);
        }).then(() => {
            Axios.get("https://kotobima.herokuapp.com/userBooks").then((res) => {
                setBooks(res.data);
            });
        });
    }, []);

    const deleteBook = (e) => {
        Axios.get("https://kotobima.herokuapp.com/deleteBook?id=" + e.target.id).then((res) => {
            Axios.get("https://kotobima.herokuapp.com/userBooks").then((res) => {
                setBooks(res.data);
            });
        });
        window.location.reload();
    };



    const booksComponent = books.map((book, idx) =>
        
        <tr>
            <td><a id="booksLinks" href={"/product?id=" + book.bookID}>{book.bookTitle}</a></td>
            <td>{book.bookLanguage}</td>
            <td>{book.bookState}</td>
            <td>{book.bookPrice} dh</td>
            <td>{book.bookDate}</td>
            <td ><button className="deletebtn" onClick={deleteBook} id={book.bookID}>supprimer</button></td>
        </tr>
    );

    return (
    <div className="profile">

        <div className="personnalInfos">
            <FontAwesomeIcon id="userIcon" icon={faUserCircle} />
            {user.userSexe === 'M' ? <h1>Mr. {user.userName}</h1> : <h1>Mme. {user.userName}</h1>}
            <table>
                <tr>
                    <td>Ville: </td>
                    <td>{user.userCity}</td>
                </tr>
                <tr>
                    <td>date de naissance: </td>
                    <td>{user.userBirth}</td>
                </tr>
                <tr>
                    <td>Adresse email: </td>
                    <td>{user.userEmail}</td>
                </tr>
                <tr>
                    <td>Numero de telepone: </td>
                    <td>{user.userPhone}</td>
                </tr>


            </table>
        </div>
        <div className="userBooks">
            <table>
                <tr>
                    <th>Titre</th>
                    <th>Langue</th>
                    <th>Etat</th>
                    <th>prix</th>
                    <th>Date d'ajout</th>
                </tr>
                {booksComponent}
            </table>
        </div>
    </div>);
}

export default Profile;