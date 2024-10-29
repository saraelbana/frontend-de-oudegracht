import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/customerPortal/home/Home.jsx";
import FooterWrap from "./components/footerWrap/FooterWrap.jsx";
import MainHeader from "./components/mainHeader/MainHeader.jsx";
import RestPortalLogin from "./pages/staffPortal/restPortalLogin/RestPortalLogin.jsx";
import EmployeeMain from "./pages/staffPortal/employeeMain/EmployeeMain.jsx";
import React from "react";
import NotFound from "./pages/notFound/NotFound.jsx";

function App() {
    return (
        <div className="app-main-container">
            <MainHeader/>
            <Routes>
                <Route path="/*" element={<Home/>}/>
                {/*this is the correct path*/}
                <Route path="/rest-login" element={<RestPortalLogin/>}/>
                {/*although let's navigate to this so that we can implement later the securely authentic authorised user login module*/}
                <Route path="/portal" element={<EmployeeMain/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <FooterWrap/>

        </div>
    );
}
export default App
