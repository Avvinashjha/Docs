import { Link } from "react-router-dom";
import { routes } from "./constants"

const Navbar = () => {
    return <div>
        <div className="nav__left">
            <h3>Prone</h3>
        </div>
        <div className="nav__mid"></div>
        <div className="nav__right">
            {
                routes.map((item) => {
                    return <Link to={item.path} key={item.path}>{item.title}</Link>
                })
            }
        </div>
    </div>
}

export default Navbar;