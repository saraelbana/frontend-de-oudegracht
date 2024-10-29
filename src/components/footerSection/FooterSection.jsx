import "./FooterSection.css";

function FooterSection(prop){
    return (
        <div className="footer-section">
            <h3>{prop.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: prop.content }} />
            {/*Note to self: maybe next time I should consider creating a table for the address and contacts*/}
        </div>
    );
}
export default FooterSection;