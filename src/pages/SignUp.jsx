import { useState } from "react";

function SignUp() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Creating your account...");
        try{
            const response = await fetch(
                "http://localhost:4000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name,
                        username,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.error || "Registration failed.");
            }

            setMessage("Account created successfully!");
        }catch (error){
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h1>Create an Account</h1>
            <p>Sign up to start saving your recipes</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        id="username"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                </div>

                <button type="submit">Sign Up</button>
            </form>

            <p>{message}</p>
            <p>Already have an account? Log in!</p>
        </div>
    );
}

export default SignUp;