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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='container'>
                <a className="navbar-brand" href="#">
                    <i className="fas fa-cubes" style={{ fontSize: '50px' }}></i>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/'>
                                Inventory System
                    </NavLink>
                        </li>
                        <li className="ml-4 nav-item">
                            <div className='d-inline-flex align-items-center'>
                                {
                                    user.avatar &&
                                    <img
                                        className="rounded-circle"
                                        src={`http://localhost:3001/uploads/${user.avatar}`}
                                        style={{
                                            height: '30px',
                                            width: '30px'
                                        }}
                                    />
                                }
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
                                <i className="fas fa-sign-out-alt mr-2"></i>
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                    {/* <form className="form-inline">
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={e => setSearchKeyword(e.target.value)}
                        />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;