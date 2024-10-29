import "./Footer.css";
import FooterSection from "../footerSection/FooterSection.jsx";

function Footer(){
    return(
        <footer className="footer">
            <FooterSection title="Address & contacts" content="Address: 123 Main Street, New York, NY 10030<br /> Tel.: +123 456 78"/>
            <FooterSection title="Address & contacts" content="Address: 123 Main Street, New York, NY 10030<br /> Tel.: +123 456 78"/>
        </footer>
    )
}
export default Footer;