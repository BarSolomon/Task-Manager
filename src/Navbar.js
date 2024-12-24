import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>task manage</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/Create">New Task</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;