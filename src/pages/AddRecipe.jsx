import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
    const navigate = useNavigate();
    const [checkingLogin, setCheckingLogin] = useState(true);

    useEffect(() => {
        async function checkLogin(){
            try {
                const response = await fetch(
                    "http://localhost:4000/api/auth/me",
                    {
                        credentials: "include"
                    }
                );

                if(!response.ok){
                    navigate("/login");
                    return;
                }
            }catch (error){
                console.error("Login check failed:", error);
                navigate("/login");
                return;
            }

            setCheckingLogin(false);
        }

        checkLogin();
    }, [navigate]);

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
    const [message, setMessage] = useState("");
    
    function handleChange(e){
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e){
        e.preventDefault();
        setMessage("");

        try{
            const response = await fetch(
                "http://localhost:4000/api/recipes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        ...formData,
                        prep_time: formData.prep_time ? Number(formData.prep_time) : null,
                        cook_time: formData.cook_time ? Number(formData.cook_time) : null,
                        servings: formData.servings ? Number(formData.servings) : null,
                    })
                }
            );
            const data = await response.json();

            if(!response.ok) {
                setMessage(data.error || "Something went wrong.");
                return;
            }

            setMessage("Recipe added successfully!");

            navigate("/");
        }catch (error){
            console.error("Error adding recipe:", error);
            setMessage("Could not connect to the server");
        }
    }

    return (
        <div>
            <h1>Add a Recipe</h1>
            <p>Save a new recipe to your collection!</p>

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
                    <label>Image URL</label>
                    <input 
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Category</label>
                    <input 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Breakfast, Dessert, Dinner..."
                    />
                </div>

                <div>
                    <label>Prep Time(minutes)</label>
                    <input 
                        type="number"
                        min="0"
                        name="prep_time"
                        value={formData.prep_time}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Cook Time(minutes)</label>
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
                    <label>Difficulty</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option value="">Choose Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        {/* add more later */}
                    </select>
                </div>

                <div>
                    <label>Ingredients</label>
                    <textarea 
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        placeholder={"Example:\n2 cups flour\n1 cup sugar\n1 tsp vanilla"}
                    />
                </div>

                <div>
                    <label>Instructions</label>
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        placeholder="Write the steps for your recipe..."
                    />
                </div>

                <button type="submit">Save Recipe</button>
                
                {message && <p>{message}</p>}
            </form>
        </div>
    );

}

export default AddRecipe;