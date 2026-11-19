import "./Home.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Home() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/auth/me",
                    {
                        credentials: "include"
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data.user);
                }
            } catch (err) {
                console.error("Error checking logged-in user:", err);
            }
        }

        async function fetchRecipes() {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/recipes",
                    {
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    throw new Error("Could not load recipes.");
                }

                const data = await response.json();
                setRecipes(data);
            } catch (err) {
                console.error("Error fetching recipes:", err);
                setError("Could not load your recipes");
            } finally {
                setLoading(false);
            }
        }

        fetchCurrentUser();
        fetchRecipes();
    }, []);

    async function handleDelete(id) {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?");

        if (!confirmed) return;

        try {
            const response = await fetch(
                `http://localhost:4000/api/recipes/${id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );

            if (!response.ok) {
                alert("Could not delete recipe.");
                return;
            }

            setRecipes(recipes.filter((recipe) => recipe.id !== id));

        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    }

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
                    <p>No recipes available yet!</p>
                )}

                {recipes.map((recipe) => (
                    <div className="recipe-placeholder" key={recipe.id}>
                        {recipe.image_url && (
                            <img
                                className="recipe-image"
                                src={`http://localhost:4000${recipe.image_url}`}
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
                        {recipe.is_owner && (
                            <>
                                <button onClick={() => navigate(`/edit-recipe/${recipe.id}`)}>Edit Recipe</button>
                                <button onClick={() => handleDelete(recipe.id)}>Delete Recipe</button>
                            </>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
