import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCurrentUser } from './../services/auth';
import { uploadImage } from './../services/upload';
import { updateUser } from './../services/user'

const Profile = (props) => {
    const { file, setFile } = props
    const [user, setUser] = useState({})
    const [first_name, setFirstname] = useState(user.first_name)
    const [last_name, setLastname] = useState(user.last_name)
    const [password, setPassword] = useState('')
    const [toggleSeePass, setToggleSeePass] = useState(false)

    useEffect(() => {
        const _user = getCurrentUser()
        setUser(_user)
    }, [file])

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);

        try {
            await uploadImage(formData)

            toast.success('An image has been successfully uploaded.')
        } catch (error) {
            const { message, data } = error.response
            toast.error(message || data)
        }

        setFile(null)
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpdateClick = async () => {
        const payload = {
            _id: user._id,
            first_name,
            last_name,
            password
        }
        try {
            await updateUser(payload)

        } catch (error) {
            console.log(error)
        }
    }

    const handleSeePasswordClick = () => {
        setToggleSeePass(!toggleSeePass)
    }

    return (
        <div className='container'>
            <div className='d-flex justify-content-center'>
                <div className="mt-5 p-5 shadow rounded" style={{ width: '30rem' }}>
                    <div className='row'>
                        <div className='col-12 d-flex justify-content-center'>
                            {
                                user.avatar &&
                                <img
                                    className="rounded-circle"
                                    src={`http://localhost:3001/uploads/${user.avatar}`}
                                    style={{
                                        height: '150px',
                                        width: '150px'
                                    }}
                                />
                            }
                        </div>

                        <div className='mt-3' />

                        <div className='col-12'>
                            <form onSubmit={onFormSubmit}>
                                <input
                                    type="file"
                                    name="myImage"
                                    onChange={e => handleFileChange(e)}
                                />
                                <button
                                    className='btn btn-primary float-right'
                                    type="submit"
                                >
                                    <i className="fas fa-cloud-upload-alt"></i>
                                </button>
                            </form>
                        </div>

                        <div className='mt-4 col-12'>
                            <label>First name</label>
                            <input
                                className='form-control'
                                defaultValue={user.first_name}
                                onChange={e => setFirstname(e.target.value)}
                            />
                            <span className="glyphicon glyphicon-ok form-control-feedback"></span>
                        </div>

                        <div className='col-12'>
                            <label>Last name</label>
                            <input
                                className='form-control'
                                defaultValue={user.last_name}
                                onChange={e => setLastname(e.target.value)}
                            />
                        </div>

                        <div className='col-12'>
                            <label>New Password</label>
                            <input
                                type={toggleSeePass ? 'text' : 'password'}
                                className='form-control'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='col-12 ml-4 mt-2'>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                onClick={() => handleSeePasswordClick()}
                            />
                            <label>See password</label>
                        </div>

                        <div className='mt-4' />

                        <div className='col-12 float-right'>
                            <button
                                className='btn btn-primary'
                                onClick={() => handleUpdateClick()}
                            >
                                <i className="fas fa-save mr-2"></i>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;