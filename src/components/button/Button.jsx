import "./Button.css";

function Button(prop) {
    const getClassName = () => {
        if (prop.size === "icon") return "icon-button";
        if (prop.buttonName === "Edit Profile") return "edit-button";
        if (prop.textWidth) return "text-width-button";
        if (prop.disable) return "disable-button";
        return "default-button";
    };

    console.log('Button props:', { ...prop });

    return (
        <button
            className={getClassName()}
            onClick={prop.onClick}
            disabled={prop.disable}
            type={prop.type}
        >
            {prop.iconSrc && (
                <>
                    <img src={prop.iconSrc} alt="" className="button-icon" />
                    {prop.text && <span>{prop.text}</span>}
                </>
            )}
            {!prop.iconSrc && (prop.text || prop.buttonName)}
        </button>
    );
}
export default Button;