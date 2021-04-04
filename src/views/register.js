import { useState } from "react"
import { register } from '../services/user'
import { useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import FormLogo from "../components/formLogo";
import { toast } from 'react-toastify';

const Register = () => {
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const handleRegisterClick = async () => {
        const payload = {
            first_name,
            last_name,
            email,
            password
        }

        try {
            await register(payload)
            history.push('/login')
            toast.success('You are successfully registered.')
        } catch (error) {
            const { message, data } = error.response
            toast.error(message || data)
        }
    }

    return (
        <div className='container'>
            <div className='mt-5 d-flex justify-content-center'>
                <div className="p-5 shadow rounded" style={{ width: '30rem' }}>
                    <FormLogo />
                    <div className='mt-4' />
                    <small>First name</small>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="John"
                        onChange={e => setFirstname(e.target.value)}
                    />
                    <small>Last name</small>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Doe"
                        onChange={e => setLastname(e.target.value)}
                    />
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
                    <button
                        className='btn btn-primary float-end'
                        onClick={() => handleRegisterClick()}
                    >
                        <i className="fas fa-user-plus mr-2"></i>
                        Register
                    </button>
                    <div className='d-inline-flex'>
                        <span>
                            Already have an account?
                        </span>
                        <NavLink
                            className='nav-link p-0 ml-1'
                            to='/login'
                        >
                            Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;