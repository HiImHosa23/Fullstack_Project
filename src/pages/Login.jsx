import { useState } from "react";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Logging in...");
        try {
            const response = await fetch(
                "http://localhost:4000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || "Login failed");
            }

            setMessage("Welcome back, " + data.user.name + "!");
        }catch (error){
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Welcome Back!</h1>
            <p>Log in to access your recipes</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Log In</button>
            </form>

            <p>{message}</p>

            <p>Don't have an account? Sign up!</p>
        </div>
    );
}

export default Login;