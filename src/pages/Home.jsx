import "./Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/recipes",
                    {
                        credentials: "include"
                    }
                );

                if(!response.ok) {
                    throw new Error("Could not load recipes.");
                }

                const data = await response.json();
                setRecipes(data);
            }catch(err){
                console.error("Error fetching recipes:", err);
                setError("Could not load your recipes");
            }finally{
                setLoading(false);
            }
        }
        
        fetchRecipes();
    }, []);
    
    return (
        <div>
            <h1>Home Page</h1>
            <p>Browse the recipes</p>

            {/* <Link to="/add-recipe">
                <button>Add a Recipe</button>
            </Link> */}

            <div className="recipe-box">
                {loading && <p>Loading recipes...</p>}
                
                {error && <p>{error}</p>}

                {!loading && !error && recipes.length === 0 && (
                    <p>You haven't added any recipes yet!</p>
                )}

                {recipes.map((recipe) => (
                    <div className="recipe-placeholder" key={recipe.id}>
                        {recipe.image_url && (
                            <img
                                src={recipe.image_url}
                                alt={recipe.name}
                            />
                        )}

                        <h2>{recipe.name}</h2>
                        <p>{recipe.description}</p>
                        <p>Category: {recipe.category}</p>
                        <p>Prep Time: {recipe.prep_time} minutes</p>
                        <p>Cook Time: {recipe.cook_time} minutes</p>
                        <p>Servings: {recipe.servings}</p>
                        <p>Difficulty: {recipe.difficulty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
