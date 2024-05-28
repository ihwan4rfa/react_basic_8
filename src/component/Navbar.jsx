import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const token = localStorage.getItem('access_token')
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");

        setTimeout(() => {
            navigate("/login")
        }, 1000)
    }

    return (
        <div className="navbar">
            <Link className="link" to="/">
                <h1>Home</h1>
            </Link>
            <Link className="link" to="/add-menu">
                <h1>Add Menu</h1>
            </Link>
            <Link className="link" to="/login" onClick={handleLogout}>
                <h1>{token ? 'Logout' : 'Login'}</h1>
            </Link>
        </div>
    )
}

export default Navbar;