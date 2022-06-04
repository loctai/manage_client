import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../../context/UserContext';

function ProfileDropdown(props) {
    const { user } = useContext(UserContext);

    return (
        <div className="dropdown" >
            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {user.username}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                {/* <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Logout</a></li> */}
                <li><Link to={'profile'} className="dropdown-item">Profile</Link></li>
                <li><span className="dropdown-item" onClick={props.handleOnClick}>Logout</span></li>
            </ul>
        </div>
    )
}

export default ProfileDropdown