
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
return (
    <header className="header">
    <Link to="/" className="logo">
        Recipe Box
    </Link>

    <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/account">Account</Link>
        <Link to="/signup">Sign Up / Log In</Link>
    </nav>
    </header>
);
}

export default Navbar;
