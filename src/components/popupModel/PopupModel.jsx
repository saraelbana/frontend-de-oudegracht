import "./PopupModel.css";
function PopupModel({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return(
        <PopupModel
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add New Ingredient"
        >
            {/* Modal content */}
        </PopupModel>
    );
}
export default PopupModel;