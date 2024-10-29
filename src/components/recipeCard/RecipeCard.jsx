import "./RecipeCard.css";
import Button from "../button/Button.jsx";
import ImageContainer from "../imageContainer/ImageContainer.jsx";

function RecipeCard() {
    const recipeObject = {
        name: "Chicken Alfredo",
        imgSrc: "/src/assets/recipe-image.jpg",
        imgAlt: "Chicken Alfredo",
        prepTime: "15 mins",
        cookingTime: "30 mins",
        nbServings: "4",
        ingredients: ["1 lb chicken", "1 lb pasta", "1 jar of Alfredo sauce"],
        instructions: ["Cook chicken", "Cook pasta", "Mix together"],
        recipeMenuSummery: "spagetti aldente red sauce with cream Chicken mushroom",
        chefsNotes: ["Add more cheese", "Use fresh pasta"]

    }
    return(
        <div className="recipe-card">
            <div className="recipe-details">
                <section className="recipe-name">
                    <h2>{recipeObject.name}</h2>
                </section>
                <section className="recipe-info-overview">
                    <ImageContainer source={recipeObject.imgSrc} alt={recipeObject.imgAlt}/>
                    <section className="recipe-quick-overview">
                        <p>{recipeObject.prepTime}</p>
                        <p>{recipeObject.cookingTime}</p>
                        <p>{recipeObject.nbServings}</p>
                    </section>
                </section>
                <section className="ingredients-list">
                    <p>Ingredients: <br/></p>
                    {/*loop here to fetch the list of ingredients*/}
                </section>
                <section className="instructions-list">
                    <p>Instructions: <br/></p>
                    {/*loop here to fetch the list of instructions*/}
                </section>
                <section className="rest-menu-summery">
                    <p>{recipeObject.recipeMenuSummery}<br/></p>
                </section>
                <section className="chefs-notes-list">
                    <p>Chefs notes: <br/></p>
                    {/*loop here to fetch the list of chefs notes*/}
                </section>
            </div>
            <div className="side-buttons">
                <Button text="Edit"/>
                <Button text="+ Add New Recipe"/>
            </div>
        </div>
    );
}
export default RecipeCard;