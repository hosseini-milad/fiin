import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap.min.css'; 
import './css/all.min.css';
import './css/App.css';
import './css/main.css';
import './css/reyham.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import Login from './pages/Login';
import Password from './pages/Password';
import ConsultantData from './modules/Consultant/ConsultantData';
import ClientList from './modules/Client/ClientList';
import ConsultantList from './modules/Consultant/ListConsultant';
import RegConsultant from './modules/Consultant/RegConsultant';
import RegClient from './modules/Client/RegClient';
import CreditList from './modules/Credit/ListCredit';
import UpLoad from './pages/upload';

import Cookies from 'universal-cookie';
import RegAgency from './modules/Agency/RegAgency';
import AgencyList from './modules/Agency/ListAgency';
import Profile from './pages/Profile';
import ForgetPass from './pages/ForgetPass';
import errortrans from './translate/error';
import ProfileView from './pages/ProfileView';
const cookies = new Cookies();
var lang = JSON.parse(localStorage.getItem('fiin-lang'));

if(!lang){
  localStorage.setItem('fiin-lang',JSON.stringify(
    {lang:errortrans.defaultLang}));
  lang = JSON.parse(localStorage.getItem('fiin-lang'));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <Router>
    {cookies.get('fiin-login')?
      <Routes>
        <Route path="/" element={<Layout><Dashboard/></Layout>}/>
        <Route path="/password" element={<Layout><Password/></Layout>}/>
        <Route path="/upload" element={<Layout><UpLoad/></Layout>}/>
        <Route path="/profile" element={<Layout><ProfileView/></Layout>}/>
        <Route path="/profile/:profileId" element={<Layout><Profile/></Layout>}/>
        
        
        {/* Credit Pages */}
        <Route path="/credit/list" element={<Layout><CreditList/></Layout>}/>


        {/* Agency Pages */}
        <Route path="/agency/register" element={<Layout><RegAgency/></Layout>}/>
        <Route path="/agency/list" element={<Layout><AgencyList/></Layout>}/>
        
        {/* Consult Pages */}
        <Route path="/consultant/data" element={<Layout><ConsultantData/></Layout>}/>
        <Route path="/consultant/register" element={<Layout><RegConsultant/></Layout>}/>
        <Route path="/consultant/list" element={<Layout><ConsultantList/></Layout>}/>

        {/* Client Pages */}
        <Route path="/client/list" element={<Layout><ClientList/></Layout>}/>
        <Route path="/client/register" element={<Layout><RegClient/></Layout>}/>
      </Routes>:
      <Routes>
        <Route path="/" element={<Login lang={lang}/>}/>
        <Route path="/:login" element={<Login lang={lang}/>}/>
        <Route path="/:login/:page" element={<Login lang={lang}/>}/>
        <Route path="/forget-pass/:otp" element={<ForgetPass/>}/>
      </Routes>}
     </Router>
    </React.StrictMode>
);

serviceWorkerRegistration.unregister();

reportWebVitals();