import { useState } from "react"
import { NavLink } from "react-router-dom"
import { login } from "../services/auth"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLoginClick = async () => {
        const payload = {
            email,
            password
        }

        try {
            await login(payload)
            window.location.href = '/'
        } catch (error) {

        }
    }


    return (
        <div className='container'>
            <div className='mt-5 d-flex justify-content-center'>
                <div className="p-5 shadow-sm rounded" style={{ width: '30rem' }}>
                    <small>Email</small>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="name@example.com"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <small>Password</small>
                    <input
                        type="password"
                        className="form-control mb-4"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div>
                        <label ></label>
                        <button
                            className='btn btn-primary float-end'
                            onClick={() => handleLoginClick()}
                        >
                            Login
                        </button>
                        <div className='d-inline-flex'>
                            <span>
                                No account yet?
                            </span>
                            <NavLink
                                className='nav-link p-0 ml-1'
                                to='/register'
                            >
                                Register
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;