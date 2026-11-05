const express = require("express");
const cors = require("cors");
const pool = require("./db/connection");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.get("/db-test", async (req, res) => {
    try {
        await pool.query("SELECT 1");
        res.send("PostgreSQL connected!");
    } catch (err) {
        res.send("PostgreSQL connection failed!");
    }
});

app.get("/api/recipes", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM recipes" //if we want by date (newest to oldest) we could do ORDER BY created_at DESC
        );
        res.json(result.rows);
    }catch(err){
        console.error("Error fetching recipes:", err);
        res.status(500).json({
            error: "Failed ro retrieve recipes"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});