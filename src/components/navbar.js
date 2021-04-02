import { NavLink } from "react-router-dom";
import { logout } from "../services/auth";
import { getCurrentUser } from './../services/auth';

const Navbar = () => {
    const user = getCurrentUser()

    const handleLogoutClick = () => {
        logout()
        window.location.href = '/login'
    }

    return (
        <div className='container'>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <NavLink className='nav-link' to='/'>
                        Inventory System
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className='nav-link' to='/profile'>
                        {
                            user?.first_name ?
                                user?.first_name :
                                'Profile'
                        }
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className='nav-link' to='/login' onClick={() => handleLogoutClick()}>
                        Logout
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;