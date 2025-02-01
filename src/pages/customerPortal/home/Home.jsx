import Footer from "../../../components/footer/Footer.jsx";
import "./Home.css";
import Header from "../../../components/header/Header.jsx";
import {Route, Routes} from "react-router-dom";
import About from "../about/About.jsx";
import Menu from "../menu/Menu.jsx";
import Reservations from "../reservations/Reservations.jsx";
import Contact from "../contact/Contact.jsx";
import Login from "../login/Login.jsx";
import NotFound from "../../notFound/NotFound.jsx";
import MainDisplay from "../mainDisplay/MainDisplay.jsx";
import ForgotPassword from "../forgotPassword/ForgotPassword.jsx";
import Signup from "../signup/Signup.jsx";
import GuestProfile from "../../../components/guestProfile/GuestProfile.jsx";

function Home()
{
    return (

        <div className="home-main">
            <Header/>
            <Routes>
                <Route path="/" element={<MainDisplay/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/reservations" element={<Reservations/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path={"/guest-profile/:username"} element={<GuestProfile/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default Home;