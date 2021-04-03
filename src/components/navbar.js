import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { logout } from "../services/auth";
import { getCurrentUser } from './../services/auth';

const Navbar = ({ file }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const _user = getCurrentUser()
        setUser(_user)
    }, [file])

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
                <li className="ml-4 nav-item">
                    <div className='d-inline-flex align-items-center'>
                        <img
                            className="rounded-circle"
                            src={`http://localhost:3001/uploads/${user.avatar}`}
                            style={{
                                height: '30px',
                                width: '30px'
                            }}
                        />
                        <NavLink className='nav-link' to='/profile'>
                            {
                                user?.first_name ?
                                    user?.first_name :
                                    'Profile'
                            }
                        </NavLink>
                    </div>
                </li>
                <li className="ml-4 nav-item">
                    <NavLink className='nav-link' to='/login' onClick={() => handleLogoutClick()}>
                        Logout
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;