import React  from 'react';
import Modal from 'react-modal';
import ReCAPTCHA from "react-google-recaptcha";
import Axios from "axios";

class RequestForm extends React.Component {

    state = {
        titreLivre: "",
        auteurLivre: "",
        langueLivre: "",
        errors: {
            titreLivre: "",
            auteurLivre: "",
            langueLivre: "",
            recaptcha: ''
        },
        popUp: false,
        token: ""
    }
    onChange = (value) => {
        this.setState({ token: value });
    }



    onSubmit = (e) => {
        e.preventDefault();
        let errs = this.state.errors;

        errs.recaptcha =
            this.state.token.length === 0
                ? 'Veuillez valider reCAPTCHA'
                : '';


        this.setState({ erros: errs })



        if (errs.recaptcha === '' && errs.titreLivre.length === 0 && errs.titreLivre.length === 0) {

            Axios.post('https://kotobima.herokuapp.com/addRequest', {
                request: {
                    titre: this.state.titreLivre,
                    auteur: this.state.auteurLivre,
                    langue: this.state.langueLivre
                }
            });
            this.setState({ popUp: true });
        }

    }


    handleChange = (e) => {
        const name = e.target.className;
        const value = e.target.value;
        let errs = this.state.errors;
        switch (name) {
            case 'titreLivre':
                errs.titreLivre =
                    value.length > 25
                        ? 'le titre du livre est trop long'
                        : value.length < 3
                            ? 'le titre du livre est trop court'
                            : '';
                break;
            case 'auteurLivre':
                errs.auteurLivre =
                    value.length > 25
                        ? 'le nom d\'u livre est trop long'
                        : value.length < 6
                            ? 'le nom d\'u livre est trop court'
                            : '';
                break;
            case 'langueLivre':
                errs.langueLivre =
                    value.length > 25
                        ? 'c\'est trop long'
                        : value.length < 6
                            ? 'c\'est trop court'
                            : '';
                break;
            default:
                break;
        }

        this.setState({ erros: errs });
        if (this.state.errors[name] === '' || this.state.errors[name] === undefined) {
            this.setState({ [name]: e.target.value });

        }


    }






    render() {
        return (<dev id="PasswordForgotten">
            <Modal
                onRequestClose={this.confirmationnHandler}
                className="signupModal"
                overlayClassName="signupOverlay"
                isOpen={this.state.popUp}>
                <a href="/" id="modelButtunclose">X</a>
                <h1>Demande envoyée</h1>
            </Modal>

            <form >
                <h1>Demander un livre:</h1>
                <p>Saisissez les informations du livre</p>
                <div className="inputitem">
                    <label htmlFor="titreLivre">Titre:</label>
                    <input className="titreLivre" type="text" onChange={this.handleChange} />

                </div><br></br>
                {this.state.errors.titreLivre !== "" &&
                    <span className='error'>{this.state.errors.titreLivre}</span>}
                <div className="inputitem">
                    <label htmlFor="auteurLivre">Auteur:</label>
                    <input className="auteurLivre" type="text" onChange={this.handleChange} />

                </div><br></br>
                {this.state.errors.auteurLivre !== "" &&
                    <span className='error'>{this.state.errors.auteurLivre}</span>}
                <div className="inputitem">
                    <label htmlFor="langueLivre">langue:</label>
                    <input className="langueLivre" type="text" onChange={this.handleChange} />

                </div><br></br>
                {this.state.errors.langueLivre !== "" &&
                    <span className='error'>{this.state.errors.langueLivre}</span>}
                <ReCAPTCHA
                    id="resetRecaptcha"
                    sitekey="6LdMlGEaAAAAAD3Oz4HAZMYxOBHPQ3amg76MTqzm"
                    onChange={this.onChange}
                    onExpired={e => this.setState({ token: "" })}
                />
                {this.state.errors.recaptcha !== "" &&
                    <span className='error'>{this.state.errors.recaptcha}</span>}
                <br></br><input onClick={this.onSubmit} id="signupBtn" type="submit" value="Ajouter la Demande" />
            </form>
        </dev>)
    }
}


export default RequestForm;