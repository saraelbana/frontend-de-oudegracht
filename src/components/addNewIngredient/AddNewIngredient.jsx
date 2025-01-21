import "./AddNewIngredient.css";
import MandatoryTag from "../mandatoryTag/MandatoryTag.jsx";
import Button from "../button/Button.jsx";
import {useState} from "react";
import {deoudegrachtApi, ingredientsEndpoint} from "../../deoudegrachtApi.js";
import {createIngredientRequestData} from "../../helpers/RecipesOperations.js";
import {useNavigate} from "react-router-dom";

function AddNewIngredient(){
    const [name, setName] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/portal/recipe/new');
    };
    const handleSave = async (e) => {
        e.preventDefault(); //needs investigation if it is necessary or not
        const requestData = createIngredientRequestData({name});

        try {
            const response = await deoudegrachtApi.post(ingredientsEndpoint, requestData);
            console.log(response.data);
            setSuccess(`ingredient created successfully! ID: ${response.data.id}`);
            setError("");
        }
        catch (e) {
            setError("Error creating new ingredient " + e.response.data);
            setSuccess("");
        }
    }
    return(
        <div className="add-new-ingredient">
            <h1>Add New Ingredient</h1>
            <Button text="<- back" onClick={handleBack}/>
            <form className="new-ingredient-form" onSubmit={handleSave}>
                <div className="new-ingredient-name">
                    <label id="name-label">
                        Name:
                        <input type='text'
                               id="name-field"
                               name="name"
                               placeholder="Name"
                               required
                               onChange={(event) => setName(event.target.value)}
                        />
                    </label>
                    <MandatoryTag/>
                </div>
                <Button text="save" onClick={handleSave}/>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
);

}
export default AddNewIngredient;