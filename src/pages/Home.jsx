import "./Home.css";

function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Browse the recipes</p>

            <div className="recipe-box">
                <div className="recipe-placeholder">Recipe 1</div>
                <div className="recipe-placeholder">Recipe 2</div>
                <div className="recipe-placeholder">Recipe 3</div>
            </div>
        </div>
    )
}

export default Home;
