import React from 'react';
import Modal from 'react-modal';
import ReCAPTCHA from "react-google-recaptcha";
import Axios from "axios";

class PasswordForgotten extends React.Component {

    state = {
        email: "",    
        errors: {
            email: '',
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

        errs.email =
        this.state.email.length < 6
                ? 'l\'email n\'est pas validé'
                : !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(this.state.email)
                    ? 'l\'email n\'est pas validé'
                    : '';
        this.setState({ erros: errs })
        
        Axios.get('https://kotobima.herokuapp.com/first_check?username=null&email=' + this.state.email).then((res) => {
                    errs.email =
                        !res.data.emailUsed
                            ? '*Cette adresse email n\'existe pas'
                            : errs.email;
                    this.setState({ errors: errs });
        }).then(()=>{

            if (errs.recaptcha === '' && errs.email.length === 0) {
                Axios.post('https://kotobima.herokuapp.com/passwordForgotten', {email: this.state.email});
                this.setState({ popUp: true });
            }

        })
    }


    handleChange = (e) => {
        const name = e.target.className;
        const value = e.target.value;
        let errs = this.state.errors;
        switch (name) {
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

        let emailTmp = this.state.email;

    
        if (this.state.errors[name] === '' || this.state.errors[name] === undefined) {
            emailTmp = e.target.value;
            this.setState({ email: emailTmp });
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
                <h1>Email envoyé à votre adresse email</h1>
            </Modal>

            <form id="resetForm">
                <p>Saisissez votre Email pour modifier votre Mot de passe</p>
                <div className="inputitem">
                    <label htmlFor="email">Email:</label>
                    <input className="email" type="email" id="resetEmail" onChange={this.handleChange} />
                    
                </div><br></br>
                {this.state.errors.email !== "" &&
                    <span className='error'>{this.state.errors.email}</span>}
                <ReCAPTCHA
                    id="resetRecaptcha"
                    sitekey="6LdMlGEaAAAAAD3Oz4HAZMYxOBHPQ3amg76MTqzm"
                    onChange={this.onChange}
                    onExpired={e => this.setState({ token: "" })}
                />
                {this.state.errors.recaptcha !== "" &&
                    <span className='error'>{this.state.errors.recaptcha}</span>}
                <br></br><input onClick={this.onSubmit} id="signupBtn" type="submit" value="envoyer l'email" />
            </form>
        </dev>)
    }
}


export default PasswordForgotten;