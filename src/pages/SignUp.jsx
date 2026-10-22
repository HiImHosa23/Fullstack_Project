
function SignUp() {
    return (
        <div>
            <h1>Create an Account</h1>
            <p>Sign up to start saving your recipes</p>

            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="Create a password"
                    />
                </div>

                <button type="submit">Sign Up</button>
            </form>

            <p>Already have an account? Log in!</p>
        </div>
    );
}

export default SignUp;