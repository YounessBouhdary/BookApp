import React from 'react';
import './componentsStyles/signupFormStyle.css';
import Axios from 'axios';
import Modal from 'react-modal';
import ReCAPTCHA from "react-google-recaptcha";

class Signup extends React.Component {

    citys = ["Marrakech", "Casablanca", "Rabat", "Fes", "Agadir", "Tanger", "Tetouan", "Meknes",
        "Tetouan", "El Jadida", "Safi", "Ouarzazate", "Oujda",
        "Settat", "Berrechid", "Chefchaouen", "Salé", "Knitra", "Taza", "Ifran", "Nador", "El hoceima", "Taroudant"
        , "Dakhla", "Errachidia", "Mohammadia", "Laayone", "Ifrane"].sort();


    state = {
        user: {
            username: "",
            sexe: "",
            email: "",
            ville: "",
            secteur: "",
            dateNaissance: "2021-01-01",
            tel: "",
            password: "",
            confirmation: ""
        },
        file: {},
        stepsArray: [true, false, false],
        styleActiveStep: {
            backgroundColor: "rgba(229,56,59,1)",
            color: "white",
            fontWeight: "bolder"
        },
        stepsArray: [true, false, false],
        errors: {
            username: '',
            email: '',
            tel: '',
            password: '',
            confirmation: '',
            recaptcha: ''
        },
        styleActiveStep: {
            backgroundColor: "rgba(229,56,59,1)",
            color: "white",
            fontWeight: "bolder",
            cursor: "default"
        },
        actualStep: 0,
        popUp: false,
        token: ""
    }

    onChange = (value) => {
        this.setState({ token: value });
    }



    handleChange = (e) => {
        const name = e.target.className;
        const value = e.target.value;
        let errs = this.state.errors;
        switch (name) {
            case 'username':
                errs.username =
                    value.length < 5
                        ? 'le nom doit contenir au moins 5 caractères'
                        : !(/^[a-zA-Z0-9 ]*$/).test(value)
                            ? 'le nom n\'est pas validé'
                            : '';
                break;
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
            case 'tel':
                errs.tel =
                    value.length < 10
                        ? 'le numéro de téléphone doit contenir 10 chiffre'
                        : !(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/).test(value)
                            ? 'le numéro de téléphone n\'est pas validé'
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
            if (name === "username" || name === "email" || name === "tel") {
                Axios.get('https://kotobima.herokuapp.com/first_check?username=' + this.state.user.username + '&email=' + this.state.user.email).then((res) => {

                    errs.username =
                        res.data.usernameUsed
                            ? '*Ce nom d\'utilisateur est deja utilisé veillez choisir un autre'
                            : errs.username;
                    errs.email =
                        res.data.emailUsed
                            ? '*Cette adresse email est deja utilisé'
                            : errs.email;
                    this.setState({ errors: errs });
                }).then(() => {

                    Axios.get('https://kotobima.herokuapp.com/second_check?phone=' + this.state.user.tel).then((res) => {

                        errs.tel =
                            res.data.phoneNumberUsed
                                ? '*Ce numéro est deja utilisé'
                                : errs.tel;
                    });

                });
            }

        });
        let userTmp = this.state.user;
        if (this.state.errors[name] === '' || this.state.errors[name] === undefined) {

            userTmp[name] = e.target.value;
            this.setState({ user: userTmp });
        }


    }





    onSubmit = (e) => {
        e.preventDefault();

        let userTmp = {
            username: this.state.user.username,
            sexe: this.state.user.sexe,
            email: this.state.user.email,
            ville: this.state.user.ville,
            secteur: this.state.user.secteur,
            dateNaissance: this.state.user.dateNaissance,
            tel: this.state.user.tel,
            password: this.state.user.password
        }



        let errs = this.state.errors;
        if (userTmp.password.length === 0) {
            errs.password = "*Ce champ est obligatoire."
            this.setState({ errors: errs });

        } else if (userTmp.password === this.state.user.confirmation) {
            Axios.post('https://kotobima.herokuapp.com/register', userTmp);

            Axios.post('https://kotobima.herokuapp.com/send_email', { email: this.state.user.email });

            this.setState({ popUp: true });
        } else {
            alert("Confirmation du mot de passe est incorrect");
        }

    }

    changeStep = (e) => {


        let nextStep;
        let tmp = [false, false, false];

        if (e.target.id === "nextStep" && this.state.actualStep === 0) {

            let errs = this.state.errors;
            errs.username =
                this.state.user.username.length === 0
                    ? '*Ce champ est obligatoire.'
                    : errs.username;
            errs.email =
                this.state.user.email.length === 0
                    ? '*Ce champ est obligatoire.'
                    : errs.email;
            errs.recaptcha =
                this.state.token.length === 0
                    ? 'Veuillez valider reCAPTCHA'
                    : ''

            this.setState({ errors: errs });

            if (this.state.errors.username === "" && this.state.errors.email === "" && this.state.errors.recaptcha === "") {
                nextStep = this.state.actualStep + 1;
                tmp[nextStep] = true;
                this.setState({ actualStep: 1 }, function () {
                    this.setState({ stepsArray: tmp });
                });
            }

        }
        if (e.target.id === "nextStep" && this.state.actualStep === 1 && this.state.errors.tel === "") {

            let errs = this.state.errors;
            errs.tel =
                this.state.user.tel.length === 0
                    ? '*C\'est avec le numero de telephone qu\'un achteur peut vous contacter'
                    : '';

            this.setState({ errors: errs }, function () {
                if (this.state.errors.tel === '') {
                    nextStep = this.state.actualStep + 1;
                    tmp[nextStep] = true;
                    this.setState({ actualStep: 2 }, function () {
                        this.setState({ stepsArray: tmp });
                    });
                }
            });

        }


        if (e.target.id === "prevStep" && this.state.actualStep > 0) {
            nextStep = this.state.actualStep - 1;
            tmp[nextStep] = true;
            this.setState({ stepsArray: tmp });
        } else {
            nextStep = this.state.actualStep;
        }


    }



    render() {
        return (<div className="signUp">
            <Modal
                onRequestClose={this.confirmationnHandler}
                className="signupModal updateModal"
                overlayClassName="signupOverlay"
                isOpen={this.state.popUp}>
                <a href="/" id="modelButtunclose">X</a>
                <h1>Votre compte est crée</h1>
            </Modal>
            <div className="Signup_logoPart">
                <img
                    className="signupImage"
                    src="./images/logo.png"
                />
                <p id="Signup_logo">Kotobi<span className="ma">.ma</span></p>
                <p className="Signup_logoDesc">Créer un nouveau compte</p>
            </div>
            <form >
                <ul id="steps" className="signUpSteps">
                    <li id="s0" style={this.state.stepsArray[0] ? this.state.styleActiveStep : null}>1</li>
                    <li id="s1" style={this.state.stepsArray[1] ? this.state.styleActiveStep : null}>2</li>
                    <li id="s2" style={this.state.stepsArray[2] ? this.state.styleActiveStep : null}>3</li>
                </ul>
                {this.state.stepsArray[0] ?
                    <div className="partOne">
                        <div className="inputitem">
                            <label htmlFor="username">NOM D'UTILISATEUR:</label>
                            <input type="text" className="username" id="username" onChange={this.handleChange} />

                        </div>
                        {this.state.errors.username !== "" &&
                            <span className='error'>{this.state.errors.username}</span>}
                        <div className="inputitem">
                            <label htmlFor="sexe">Sexe:</label>
                            <select className="sexe" defaultValue="" onChange={this.handleChange} >
                                <option hidden value="">Sexe</option>
                                <option value="F">Mme.</option>
                                <option value="M">Mr.</option>
                            </select>
                        </div>


                        <div className="inputitem">
                            <label htmlFor="email">Email:</label>
                            <input className="email" type="email" id="email" onChange={this.handleChange} />
                        </div>
                        {this.state.errors.email !== "" &&
                            <span className='error'>{this.state.errors.email}</span>}
                        <ReCAPTCHA
                            sitekey="6LdMlGEaAAAAAD3Oz4HAZMYxOBHPQ3amg76MTqzm"
                            onChange={this.onChange}
                            onExpired={e => this.setState({ token: "" })}
                        />
                        {this.state.errors.recaptcha !== "" &&
                            <span className='error'>{this.state.errors.recaptcha}</span>}
                    </div>
                    : null}

                {this.state.stepsArray[1] ?
                    <div className="partTwo">
                        <div className="inputitem">
                            <label htmlFor="phoneNumber">PHONE:</label>
                            <input className="tel" type="tel" id="phoneNumber" onChange={this.handleChange} />
                        </div>
                        {this.state.errors.tel !== "" &&
                            <span className='error'>{this.state.errors.tel}</span>}

                        <div className="inputitem">
                            <label htmlFor="phoneNumber">Ville:</label>
                            <select className="ville" defaultValue="" onChange={this.handleChange}>
                                <option hidden value="">Ville</option>
                                {this.citys.map((item, idx) =>
                                    <option key={idx} value={(item.toLowerCase()).replace(" ", "_")}>{item}</option>)}
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                        <div className="inputitem">
                            <label htmlFor="Secteur">Secteur:</label>
                            <select className="secteur" defaultValue="" onChange={this.handleChange}>

                                <option hidden value="">Secteur</option>
                                <option value="option">option</option>
                                <option value="option">option</option>
                                <option value="option">option</option>
                            </select>
                        </div>
                    </div>
                    : null}
                {this.state.stepsArray[2] ?
                    <div className="partThree">
                        <div className="inputitem">
                            <label htmlFor="dateN">Date de naissance:</label>
                            <input className="dateNaissance" type="date" id="dateN" onChange={this.handleChange} />
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
                        <input onClick={this.onSubmit} id="signupBtn" type="submit" value="Créer un compte" />
                    </div>
                    : null}


            </form>
            <div> {!this.state.stepsArray[0] ? <button onClick={this.changeStep} id="prevStep">Précédent</button> : null}
                {!this.state.stepsArray[2] ? <button onClick={this.changeStep} id="nextStep">Suivant</button> : null}</div>
        </div>);
    }
}

export default Signup