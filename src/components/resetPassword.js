import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import ReCAPTCHA from "react-google-recaptcha";


class ResetPassword extends React.Component {
    state = {
        user: {
            id: this.getQueryStringValue("id"),
            email: "",
            password: "",
            confirmation: ""
        },
        errors: {
            email: '',
            password: '',
            confirmation: '',
            recaptcha: ''
        },
        popUp: false,
        token: ""
    }

    getQueryStringValue(key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }


    onChange = (value) => {
        this.setState({ token: value });
    }

    handleChange = (e) => {
        const name = e.target.className;
        const value = e.target.value;
        let errs = this.state.errors;
        switch (name) {
            case 'password':
                errs.password =
                    value.length < 8
                        ? 'le mot de passe doit contenir au moins 8 caractères'
                        : '';
                break;
            case 'confirmation':
                errs.confirmation =
                    value !== this.state.user.password
                        ? 'la confirmation n\'est pas validée'
                        : '';
                break;

            case 'email':
                errs.email =
                    value.length < 6
                        ? 'l\'email n\'est pas validé'
                        : !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(value)
                            ? 'l\'email n\'est pas validé'
                            : '';
                break;
            default:
                break;
        }
        this.setState({ errors: errs }, function () {
            let userTmp = this.state.user;
            if (this.state.errors[name] === '' || this.state.errors[name] === undefined) {

                userTmp[name] = e.target.value;
                this.setState({ user: userTmp });
            }

        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        let userTmp = {
            email: this.state.user.email,
            password: this.state.user.password
        }


        let errs = this.state.errors;
        Axios.get('https://kotobima.herokuapp.com/first_check?username=null&email=' + this.state.email).then((res) => {
                    errs.email =
                        !res.data.emailUsed
                            ? '*Cette adresse email n\'existe pas'
                            : errs.email;
                    this.setState({ errors: errs });
        }).then(()=>{
            if (userTmp.password.length === 0) {
                errs.password = "*Ce champ est obligatoire."
                this.setState({ errors: errs });
    
            } else if (this.state.errors.email === "" && this.state.errors.password === "" && this.state.errors.confirmation === "") {
                Axios.post('https://kotobima.herokuapp.com/resetPassword', this.state.user);
                this.setState({ popUp: true });
            } else {
                alert("Confirmation du mot de passe est incorrect");
            }
        })
    }




    render() {
        return (<dev id="ResetPassword">
            { this.state.user.id !== "" ? <form>
                <Modal
                    onRequestClose={this.confirmationnHandler}
                    className="signupModal"
                    overlayClassName="signupOverlay"
                    isOpen={this.state.popUp}>
                    <a href="/" id="modelButtunclose">X</a>
                    <h1>Votre Mot de passe est modifié</h1>
                </Modal>
                <div className="inputitem">
                    <label htmlFor="email">Email:</label>
                    <input className="email" type="email" id="email" onChange={this.handleChange} />
                </div>
                <div className="inputitem">
                    <label htmlFor="password">MOT DE PASSE:</label>
                    <input className="password" type="password" id="password" onChange={this.handleChange} />
                </div>
                {this.state.errors.password !== "" &&
                    <span className='error'>{this.state.errors.password}</span>}

                <div className="inputitem">
                    <label htmlFor="passwordCofirmation">COMFIRMATION:</label>
                    <input className="confirmation" id="passwordCofirmation" type="password" onChange={this.handleChange} />
                </div>
                {this.state.errors.confirmation !== "" &&
                    <span className='error'>{this.state.errors.confirmation}</span>}
                <ReCAPTCHA
                    sitekey="6LdMlGEaAAAAAD3Oz4HAZMYxOBHPQ3amg76MTqzm"
                    onChange={this.onChange}
                    onExpired={e => this.setState({ token: "" })}
                />
                {this.state.errors.recaptcha !== "" &&
                    <span className='error'>{this.state.errors.recaptcha}</span>}
                <input onClick={this.onSubmit} id="signupBtn" type="submit" value="Créer un compte" />


            </form> : <h1>404</h1>}

        </dev>)
    };
}

export default ResetPassword;