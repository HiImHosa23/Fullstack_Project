import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Account() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    "http://localhost:4000/api/auth/me",
                    {
                        credentials: "include"
                    }
                );

                if(response.status === 401){
                    navigate("/login");
                    return;
                }

                if(!response.ok){
                    throw new Error("Could not load account information.");
                }

                const data = await response.json();
                setUser(data.user);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const response = await fetch(
                "http://localhost:4000/api/auth/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            if(!response.ok){
                throw new Error("Could not log out.");
            }

            navigate("/login");
        }catch(err){
            setError(err.message);
        }
    };

    if(loading){
        return <p>Loading account...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    if(!user){
        return null;
    }

    return (
        <div className="account">
            <h1>My Account</h1>

            <div className="account-box">
                <h2>{user.name}</h2>
                <p><strong>Email:</strong>{user.email}</p>
                <p><strong>Username:</strong>{user.username}</p>
                <p><strong>Member Since:</strong>{new Date(user.created_at).toLocaleDateString()}</p>

                <button>Edit Profile</button>
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
}

export default Account;
