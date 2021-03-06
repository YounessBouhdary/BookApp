import React, { useEffect , useState } from "react";
import './App.css';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Footer from './components/footer.js';
// import Blog from './components/blog.js';
import ProductsPage from './components/ProductsPage';
import adsForm from './components/adsForm.js';
import SignUpFrom from './components/signupForm';
import Axios from "axios";
import UpperBar from './components/upperBar.js';
import Warning from './components/warning.js';
import Profile from './components/profile.js';
import OneProductPage from './components/oneProductPage.js';
import NewBook from './components/newBook.js';
import AddLessonNotes from './components/addLessonNotes.js';
import AddSchoolBook from './components/addSchoolBook.js';
import AddUniversityBook from './components/addUniversityBook.js';
import PasswordForgotten from './components/passwordForgotten.js';
import UniversityProductsList from './components/universityProductsList.js';
import SchoolProductsList from './components/schoolProductsList';
import LessonNotes from './components/lessonNotes.js';
import ResetPassword from "./components/resetPassword.js";
import ContactUs from "./components/contactUs.js";
import AboutUs from "./components/aboutUs.js";
import Reglement from "./components/reglement";
import F_A_Q from "./components/F_A_Q.js";
import RequestForm from "./components/requestForm";





function App() {

  
  const [data, setData] = useState({loggedIn: false, user: {}});

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("https://kotobima.herokuapp.com/login").then((response)=>{
      
      setData(response.data);
    });
  }, []);

  var component1;
  var component2;
  var component3;
  var component4;
  var component5;
  var profileCmp;
  if(data.loggedIn){
    component1 = adsForm;
    component2 = AddSchoolBook;
    component3 = AddUniversityBook;
    component4 = AddLessonNotes;
    profileCmp = Profile;
    component5 = RequestForm;
  } else {
    component1 = Warning;
    component2 = Warning;
    component3 = Warning;
    component4 = Warning;
    component5 = Warning;
    profileCmp = Home;
  }


  return (
    <Router>
      <div className="App">
        
      {data.loggedIn &&
        <UpperBar username={data.user.userName} userId={data.user.userId} />
      }

        <Navbar />
        <Switch>
          <Route key="home" path="/" exact component={Home} />
          <Route key="products" path="/products" component={ProductsPage}/>
          <Route key="universityProducts" path="/universityProducts" component={UniversityProductsList}/>
          <Route key="schoolProducts" path="/schoolProducts" component={SchoolProductsList}/>
          <Route key="lessonNotes" path="/lessonNotes" component={LessonNotes}/>
          <Route key="login" path="/login" component={data.loggedIn ? Home : SignUpFrom}/>
          {/* <Route path="/blog" component={Blog}/> */}
          <Route key="adsForm" path="/adsForm" component={component1}/>
          <Route key="profileCmp" path="/profile" component={profileCmp}/>
          <Route key="OneProductPage" path="/product" component={OneProductPage}/>
          <Route key="NewBook" path="/newBook" component={NewBook}/>
          <Route key="addSB" path="/addSchoolBook" component={component2}/>
          <Route key="addDoc" path="/addLessonNotes" component={component4}/>
          <Route key="addUB" path="/AddUniversityBook" component={component3}/>
          <Route key="PasswordForgotten" path="/passwordForgotten" component={PasswordForgotten}/>
          <Route key="ResetPassword" path="/reset_password" component={ResetPassword}/>
          <Route key="ContactUs" path="/contactUs" component={ContactUs}/>
          <Route key="AboutUs" path="/aboutUs" component={AboutUs}/>
          <Route key="Reglement" path="/reglement" component={Reglement}/>
          <Route key="requestForm" path="/requestForm" component={component5}/>
          <Route key="F_A_Q" path="/faq" component={F_A_Q}/>        
        </Switch>
        <Footer />
      </div>
    </Router>);
}

export default App;
