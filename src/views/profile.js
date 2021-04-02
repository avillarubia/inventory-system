import { getCurrentUser } from './../services/auth';

const Profile = () => {
    const user = getCurrentUser()

    return (
        <div className='container'>
            <div>Picture</div>
            <h1>{user.first_name} {user.last_name}</h1>
            <h1>{user.email} </h1>
        </div>
    );
}

export default Profile;