import "./EditRecipe.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image_url: "",
        category: "",
        prep_time: "",
        cook_time: "",
        servings: "",
        difficulty: "",
        ingredients: "",
        instructions: ""
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await fetch(
                    `http://localhost:4000/api/recipes/${id}`,
                    {
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    if (response.status === 401) {
                        navigate("/login");
                        return;
                    }

                    throw new Error("Could not find recipe.");
                }

                const recipe = await response.json();
                console.log("Recipe received from backend:", recipe);

                setFormData({
                    name: recipe.name || "",
                    description: recipe.description || "",
                    image_url: recipe.image_url || "",
                    category: recipe.category || "",
                    prep_time: recipe.prep_time ?? "",
                    cook_time: recipe.cook_time ?? "",
                    servings: recipe.servings ?? "",
                    difficulty: recipe.difficulty || "",
                    ingredients: recipe.ingredients || "",
                    instructions: recipe.instructions || ""
                });
            } catch (error) {
                console.error(error);
                setMessage("Could not load recipe.");
            } finally {
                setLoading(false);
            }
        }
        fetchRecipe();
    }, [id, navigate]);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const recipeData = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (["prep_time", "cook_time", "servings"].includes(key)) {
                    recipeData.append(
                        key,
                        value === "" ? "" : Number(value)
                    );
                } else {
                    recipeData.append(key, value);
                }
            });

            if (imageFile) {
                recipeData.append("image", imageFile);
            }

            const response = await fetch(
                `http://localhost:4000/api/recipes/${id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    body: recipeData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.error || "Could not update recipe.");
                return;
            }

            navigate("/");
        } catch (error) {
            console.error(error);
            setMessage("Could not connect to the server.");
        }
    }

    if (loading) {
        return <p>Loading recipe...</p>;
    }

    return (
        <div>
            <h1>Edit Recipe</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Recipe Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Chosen Image</label>
                    {formData.image_url && (
                        <img
                            className="recipe-image"
                            src={`http://localhost:4000${formData.image_url}`}
                            alt={formData.name}
                        />
                    )}
                    <label>Choose a New Image</label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </div>
                <div>
                    <label>Category</label>
                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Prep Time (minutes)</label>
                    <input
                        type="number"
                        min="0"
                        name="prep_time"
                        value={formData.prep_time}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Cook Time (minutes)</label>
                    <input
                        type="number"
                        min="0"
                        name="cook_time"
                        value={formData.cook_time}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Servings</label>
                    <input
                        type="number"
                        min="1"
                        name="servings"
                        value={formData.servings}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Diffculty</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option value="">Choose difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label>Ingredients</label>
                    <textarea
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Instructions</label>
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Save Changes</button>

                {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default EditRecipe;