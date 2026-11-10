require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/connection");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 4000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: "user_sessions",
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24
    }
}));

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

app.post("/api/auth/register", async(req, res) => {
    try{
        const {name, username, email, password} = req.body;

        if(!name || !username || !email || !password){
            return res.status(400).json({
                error: "Please fill in all fields"
            });
        }

        if(password.length < 8){
            return res.status(400).json({
                error: "Password must be at least 8 characters."
            });
        }
        
        const passwordHash = await bcrypt.hash(password, 12);
        const result = await pool.query(
            `INSERT INTO users (name, username, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, username, email, created_at`,
            [name, username, email, passwordHash]
        );
        const user = result.rows[0];

        req.session.user = user;
        res.status(201).json({
            message: "Account created successfully!",
            user: user
        });
    } catch (err){
        console.error("Registration error:", err);
        if(err.code === "23505"){
            return res.status(409).json({
                error: "That username or email is already taken."
            });
        }
        
        res.status(500).json({
            error: "Something went wrong while creating this account"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});