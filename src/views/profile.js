import { getCurrentUser } from './../services/auth';
const Profile = () => {
    const user = getCurrentUser()

    return (
        <div className='container'>
            <h1>{user.first_name} {user.last_name}</h1>
        </div>
    );
}

export default Profile;