import React from "react";
import Axios from 'axios';
import Modal from 'react-modal';
import ReCAPTCHA from "react-google-recaptcha";

class AddUniversityBook extends React.Component {
    state = {
        livre: {
            titreLivre: "",
            branche: "",
            nomFaculte: "",
            etatLivre: "",
            langueLivre: "",
            imgPath: "",
            prixLivre: 0
        },
        file: undefined,
        stepsArray: [true, false, false],
        styleActiveStep: {
            backgroundColor: "rgba(229,56,59,1)",
            color: "white",
            fontWeight: "bolder"
        },
        errors: {
            titreLivre: '',
            recaptcha: '',
            file: ''
        },
        confirmation: false,
        token: ""
    }

    les_domains = ["Mathématiques", "Physique", "Chimie",
        "histoire géographie", "Littérature Française", "Littérature Anglaise", "Littérature arabe",
        "Éducation Islamique", "Médecine", "philosophie", "économie",
        "Informatique", "Ingénierie ", "Architecture", "agriculture", "Droits", "Commerce"].sort();


    onChange = (value) => {
        this.setState({ token: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        let errs = this.state.errors;
        errs.recaptcha =
            this.state.token.length === 0
                ? 'Veuillez valider reCAPTCHA'
                : '';
        errs.file =
            this.state.file === undefined
                ? 'Veuillez ajouter l\'image du livre'
                : ''
        this.setState({ errors: errs }, function () {
            if (this.state.errors.file === "") {
                fd.append('image', this.state.file, this.state.file.name);
                Axios.post('https://kotobima.herokuapp.com/upload', fd)
                    .then(res => {
                        let livre = this.state.livre;
                        livre.imgPath = res.data.imgPath;
                        this.setState({ livre });
                    }).then(res => {
                        if (this.state.errors.recaptcha === "") {
                            Axios.post('https://kotobima.herokuapp.com/addBook_university', this.state.livre);
                            this.setState({ confirmation: true });
                        }
                    });

            }
        });


    }




    handleChange = (e) => {
        const name = e.target.className;
        const value = e.target.value;
        let errors = this.state.errors;

        switch (name) {
            case 'titreLivre':
                errors.titreLivre =
                    value.length < 5
                        ? 'le titre doit contenir au moins 5 caractères'
                        : !(/^[a-zA-Z0-9 ]*$/).test(value)
                            ? 'le titre n\'est pas validé'
                            : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });

        if (e.target.className !== "file" && (this.state.errors[e.target.className] === '' || this.state.errors[e.target.className] === undefined)) {

            let livreTmp = this.state.livre;
            livreTmp[e.target.className] = e.target.value;

            this.setState({ livre: livreTmp });

        } else if (e.target.className === "file") {
            // Update the state
            this.setState({ file: e.target.files[0] });
        }

    }

    onFileUpload = (e) => {
        let file = [this.state.file]
        file = e.target.files[0];
        this.setState({ file });
    }

    changeStep = (e) => {
        let actuelStep;
        let nextStep;
        let tmp = [false, false, false];
        for (let i = 0; i < 3; i++) {
            if (this.state.stepsArray[i]) {
                actuelStep = i;
            }
        }
        if (e.target.id === "nextStep" && actuelStep < 2) {
            nextStep = actuelStep + 1;
            tmp[nextStep] = true;
            this.setState({ stepsArray: tmp });
        } else if (e.target.id === "prevStep" && actuelStep > 0) {
            nextStep = actuelStep - 1;
            tmp[nextStep] = true;
            this.setState({ stepsArray: tmp });
        } else if (e.target.id === "st0" || e.target.id === "st1" || e.target.id === "st2") {
            nextStep = e.target.id.match(/\d+/)[0];
            tmp[nextStep] = true;
            this.setState({ stepsArray: tmp });
        } else {
            nextStep = actuelStep;
        }



    }
    confirmationHandler = () => {
        this.setState({ confirmation: false });
        window.location.reload();
    }

    render() {

        return (<div>

            <Modal
                onRequestClose={this.confirmationnHandler}
                className="signupModal updateModal"
                overlayClassName="signupOverlay"
                isOpen={this.state.confirmation}>
                <button id="modelButtunclose" onClick={this.confirmationHandler}>X</button>
                <h1>Votre livre est ajouté</h1>
            </Modal>
            <form id="booksForm" encType="multipart/form-data" onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <h1>Formulaire d'annonce</h1>
                <ul id="steps">
                    <li id="st0" onClick={this.changeStep} style={this.state.stepsArray[0] ? this.state.styleActiveStep : null}>1. Description du Livre</li>
                    <li id="st1" onClick={this.changeStep} style={this.state.stepsArray[1] ? this.state.styleActiveStep : null}>2. Autres Informations</li>
                    <li id="st2" onClick={this.changeStep} style={this.state.stepsArray[2] ? this.state.styleActiveStep : null}>3. Ajout de L'image</li>
                </ul>
                <div className="allParts">
                    {this.state.stepsArray[0] ?
                        <div className="firstPart">

                            <div className="label_input"><label>Titre: </label>
                                <input className="titreLivre" placeholder="Titre du Document..." type="text" /></div>
                            {this.state.errors.titreLivre.length > 0 &&
                                <span className='error'>{this.state.errors.titreLivre}</span>}
                            <div className="label_input"><label>Faculté/école: </label>
                                <input className="nomFaculte" placeholder="faculté ou école supérieur..." type="text" /></div>

                            <div className="label_input"><label>Branche: </label>
                                <select defaultValue="" className="branche">
                                    <option hidden value="">Domaine: </option>
                                    {this.les_domains.map((item, idx) =>
                                        <option key={idx} value={(item.toLowerCase())}>{item}</option>)}
                                    <option value="autre">Autre</option>
                                </select></div>
                        </div>
                        : null}
                    {this.state.stepsArray[1] ?
                        <div className="secondPart" >
                            <div className="label_input"><label>Etat: </label>
                                <select defaultValue="" className="etatLivre">
                                    <option hidden value="">Etat du livre</option>
                                    <option value="neuf">Neuf</option>
                                    <option value="Comme_neuf">Comme neuf</option>
                                    <option value="Bon_etat">Bon état</option>
                                    <option value="acceptable">Acceptable</option>
                                </select></div>
                            <div className="label_input"><label>Langue: </label>
                                <select defaultValue="" className="langueLivre">
                                    <option hidden value="">Langue du livre</option>
                                    <option value="arabe">Arabe</option>
                                    <option value="français">Français</option>
                                    <option value="anglais">Anglais</option>
                                    <option value="espagnol">Espagnol</option>
                                    <option value="allemand">Allemand</option>
                                    <option value="autre">Autre</option>
                                </select></div>
                            <div className="label_input"><label>Prix: </label>
                                <input className="prixLivre" placeholder="Prix ... DH" type="number" />
                            </div>
                        </div>
                        : null}
                    {this.state.stepsArray[2] ?
                        <div className="thirdPart">
                            <input className="fileInput" type="file" name="image" accept="image/jpg, image/png, image/jpeg" onChange={this.onFileUpload}></input>
                            {this.state.errors.file !== "" &&
                                <span className='error'>{this.state.errors.file}</span>}
                            <ReCAPTCHA
                                sitekey="6LdMlGEaAAAAAD3Oz4HAZMYxOBHPQ3amg76MTqzm"
                                onChange={this.onChange}
                                onExpired={e => this.setState({ token: "" })}
                            />
                            {this.state.errors.recaptcha !== "" &&
                                <span className='error'>{this.state.errors.recaptcha}</span>}
                            <input id="submitbtn" type="submit" value="Envoyer" />
                        </div>
                        : null}

                </div>
            </form>
            <div> {!this.state.stepsArray[0] ? <button onClick={this.changeStep} id="prevStep">Précédent</button> : null}
                {!this.state.stepsArray[2] ? <button onClick={this.changeStep} id="nextStep">Suivant</button> : null}</div></div>
        )
    }
}

export default AddUniversityBook;