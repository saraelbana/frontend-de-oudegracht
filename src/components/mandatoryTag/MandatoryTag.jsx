import  "./MandatoryTag.css";

function MandatoryTag(prop){
    return(
        <span className="mandatory-tag"> * {prop.restrictionMessage}</span>
    );
}
export default MandatoryTag;