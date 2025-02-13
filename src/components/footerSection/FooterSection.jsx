import "./FooterSection.css";

function FooterSection(prop){
    return (
        <div className="footer-section">
            <h3>{prop.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: prop.content }} />

        </div>
    );
}
export default FooterSection;