import React from 'react';
import Axios from "axios";
import './componentsStyles/oneProductPage.css';


class OneProductPage extends React.Component {
    state = {
        product: {
            Livre: {
                imgPath: ''
            }
        },
        phonenumbers: []
    }

    getQueryStringValue(key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    componentDidMount() {
        Axios.get("https://kotobima.herokuapp.com/product?id=" + this.getQueryStringValue("id"))
            .then(res => {
                const bk = res.data;
                this.setState({ product: bk });
            }).then(() => {
                Axios.post("https://kotobima.herokuapp.com/phoneNumber", { id: this.state.product.Livre.user_id }).then(res => {
                    const pn = res.data;
                    this.setState({ phonenumbers: pn });
                });
            })
    }






    render() {
        return (<div className="oneProduct">

            <div className="bookImage"
                style={{
                    backgroundImage: "url(\"" + String(this.state.product.Livre.imgPath) + "\")"
                }}
            > </div>
            <div className="infoSection">
                <div className="bookinfos">
                    <table>
                        <tr>
                            <td>Titre: </td>
                            <td>{this.state.product.Livre.title}</td>
                        </tr>
                        {this.state.product.Livre.author !== undefined ?
                            <tr>
                                <td>Auteur: </td>
                                <td>{this.state.product.Livre.author}</td>
                            </tr>
                            : null}
                        {this.state.product.Livre.genre !== undefined ?
                            <tr>
                                <td>Genre: </td>
                                <td>{this.state.product.Livre.genre}</td>
                            </tr>
                            : null}
                            {this.state.product.Livre.domain !== undefined ?
                            <tr>
                                <td>Domaine: </td>
                                <td>{this.state.product.Livre.domain}</td>
                            </tr>
                            : null}
                            {this.state.product.Livre.subject !== undefined ?
                            <tr>
                                <td>Matière: </td>
                                <td>{this.state.product.Livre.subject}</td>
                            </tr>
                            : null}
                            {this.state.product.Livre.level !== undefined ?
                            <tr>
                                <td>Niveau: </td>
                                <td>{this.state.product.Livre.level}</td>
                            </tr>
                            : null}
                            {this.state.product.Livre.university !== undefined ?
                            <tr>
                                <td>Faculté / école: </td>
                                <td>{this.state.product.Livre.university}</td>
                            </tr>
                            : null}
                            {this.state.product.Livre.module !== undefined ?
                            <tr>
                                <td>Module: </td>
                                <td>{this.state.product.Livre.module}</td>
                            </tr>
                            : null}
                        <tr>
                            <td>Langue: </td>
                            <td>{this.state.product.Livre.language}</td>
                        </tr>
                        
                        <tr>
                            <td>Etat: </td>
                            <td>{this.state.product.Livre.state}</td>
                        </tr>
                        {this.state.product.Livre.description !== undefined && this.state.product.Livre.description !== '' ?
                            <p>
                                Description:<br></br> 
                                {this.state.product.Livre.description}
                            </p>
                        : null}
                        <tr>
                            <td>Prix: </td>
                            <td>{this.state.product.Livre.price} Dh</td>
                        </tr>
                        
                    </table>
                </div>
                <div className="sellerInfos">
                    <table>
                        <tr>
                            <td>Ville: </td>
                            <td>{this.state.product.Livre.city}</td>
                        </tr>
                        <tr>
                            <td>Date d'ajout: </td>
                            <td>{this.state.product.Livre.bookDate}</td>
                        </tr>
                        <tr>
                            <td>Numéro de Télépohne: </td>
                            <td>
                            {this.state.phonenumbers.map((item, idx) =>
                                <div key={idx} >{item.phonenumber}</div>)}
                            </td>    
                        </tr>

                    </table>
        </div>
            </div >
        </div >);
    }
}

export default OneProductPage;