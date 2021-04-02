import { useState } from 'react';
import { getCurrentUser } from './../services/auth';
import { uploadImage } from './../services/upload';

const Profile = () => {
    const user = getCurrentUser()
    const [file, setFile] = useState(null)

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', file);

        try {
            const { data } = await uploadImage(formData)
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className='container'>
            <div>
                <img src={'http://localhost:3001/uploads/1617375749263.jpeg'} />
            </div>
            <form onSubmit={onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myImage" onChange={e => handleFileChange(e)} />
                <button type="submit">Upload</button>
            </form>
            <h1>{user.first_name} {user.last_name}</h1>
            <h1>{user.email} </h1>
        </div>
    );
}

export default Profile;