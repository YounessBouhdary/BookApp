import React from "react";
import './componentsStyles/newBookStyle.css';


class NewBook extends React.Component {


    render() {

        return (<div className="newBook">
            <h2>Choisissez le type de livre que vous souhaitez annoncer</h2>
            <div className="links">
                <a href="/adsForm">Bouqain (Roman ou nouvelle)</a><br></br>
                <a href="/addSchoolBook">Livre Scolaire</a><br></br>
                <a href="/addUniversityBook">Livre Universitaire</a><br></br>
                <a href="/addLessonNotes">Notes de cours <br></br><span>(Des cours / des exercices courigés ...)</span></a><br></br>
            </div>
        </div>)
    }
}

export default NewBook;