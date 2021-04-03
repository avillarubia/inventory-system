import { useEffect, useState } from 'react';
import { getCurrentUser } from './../services/auth';
import { uploadImage } from './../services/upload';
import { updateUser } from './../services/user'

const Profile = () => {
    const [user, setUser] = useState({})
    const [file, setFile] = useState(null)
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [password, setPassword] = useState('')

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
        } catch (error) {
        }

        setFile(null)
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpdateClick = async () => {
        const payload = {
            first_name,
            last_name,
            password
        }
        await updateUser(payload)
    }

    return (
        <div className='container' >
            <div>
                <img
                    className="rounded-circle"
                    src={`http://localhost:3001/uploads/${user.avatar}`}
                    style={{
                        height: '150px',
                        width: '150px'
                    }}
                />
            </div>
            <form onSubmit={onFormSubmit}>
                <input
                    type="file"
                    name="myImage"
                    onChange={e => handleFileChange(e)}
                />
                <button
                    className='btn btn-primary'
                    type="submit"
                >
                    Upload
                </button>
            </form>
            <label>First name</label>
            <input
                className='form-control'
                defaultValue={user.first_name}
                onChange={e => setFirstname(e.target.value)}
            />
            <label>Last name</label>
            <input
                className='form-control'
                defaultValue={user.last_name}
                onChange={e => setLastname(e.target.value)}
            />
            <label>New Password</label>
            <input
                className='form-control'
                onChange={e => setPassword(e.target.value)}
            />
            <button
                className='btn btn-primary'
                onClick={() => handleUpdateClick}
            >
                Update
            </button>
        </div>
    );
}

export default Profile;