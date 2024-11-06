import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/customerPortal/home/Home.jsx";
import FooterWrap from "./components/footerWrap/FooterWrap.jsx";
import MainHeader from "./components/mainHeader/MainHeader.jsx";
import EmployeeMain from "./pages/staffPortal/employeeMain/EmployeeMain.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";
import TestComponent from "./components/testParagraph/TestComponent.jsx";

function App() {

    return (
        <div className="app-main-container">
            <MainHeader/>
            <Routes>
                <Route path="/*" element={<Home/>}/>
                {/*this is the correct path*/}
                {/*<Route path="/portal" element={<PortalLogin/>}/>*/}
                {/*although let's navigate to this so that we can implement later the securely authentic authorised user login module*/}
                <Route path="/portal/*" element={<EmployeeMain/>}/>
                <Route path={"/test"} element={<TestComponent/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <FooterWrap/>

        </div>
    );
}
export default App
