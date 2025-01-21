import "./AddNewInstruction.css";
import Button from "../button/Button.jsx";

function AddNewInstruction(prop){
    return (
        <div className="instruction-container">
            <label id={`instructions-label-${prop.index}`}>
                Step {prop.index + 1}:
                <textarea
                    id={`instructions-field-${prop.index}`}
                    name={`instruction-${prop.index}`}
                    placeholder="Enter instruction step"
                    value={prop.instruction}
                    required
                    onChange={(event) => prop.onChange(prop.index, event.target.value)}
                />
            </label>
            {prop.index > 0 && (
                <Button
                    text="✕"
                    onClick={() => prop.onRemove(prop.index)}
                    size="icon"
                    className="remove-instruction-button"
                />
            )}
        </div>
    );
}

export default AddNewInstruction;