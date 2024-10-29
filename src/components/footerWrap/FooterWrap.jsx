import "./FooterWrap.css";
import ImageContainer from "../imageContainer/ImageContainer.jsx";

function FooterWrap(){
    return(
        <footer className="footer-wrap">
            <div className="left-footer-info">
                <p>
                    © 2024 <b>De Oudegracht</b>. ALL Rights Reserved.
                    <br />
                    <b>Powered By Novi.nl</b>
                </p>
            </div>
            <div className="midlle-footer-info">
                <ImageContainer source="/src/assets/logo-50x50.png" alt="restaurant logo"/>
            </div>
            <div className="right-footer-info">
                <p>
                    De Oudegracht... Experience the extraordinary.
                </p>
            </div>
        </footer>
    )
}
export default FooterWrap;