import React, { useContext } from 'react'
import LoginRegister from '../../components/LoginRegister/LoginRegister';
import ProfileDropdown from '../../components/ProfileDropdown/ProfileDropdown'
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { logout } from '../../api/auth'
import LoadingContext from '../../context/LoadingContext';
import { useNavigate } from 'react-router-dom'

function TopNav(prop) {
    const { user, setUser } = useContext(UserContext);
    const setLoading = useContext(LoadingContext);
    const navigate = useNavigate();

    var loggedin
    if (user.username) {
        loggedin = true
    } else {
        loggedin = false
    }

    const handleOnClick = () => {
        setLoading(true)
        logout().then(res => {
            setLoading(false)
            if (res.message === 'logout') {
                navigate('/home');
                setUser({})
            }
        }).catch(err => console.log(err))
    }

    var profileElement;
    if (loggedin) {
        profileElement = (<ProfileDropdown handleOnClick={handleOnClick}></ProfileDropdown>)
    } else {
        profileElement = (<LoginRegister></LoginRegister>)
    }

    return (
        <nav className="navbar navbar-dark" style={{ "backgroundColor": "#178eeb" }}>
            <div className="container-fluid">
                <div className='d-flex justify-content-between' style={{ width: '15%' }}>
                    <button className="navbar-toggler " type="button" onClick={prop.tongleSideBar}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to={'/'} className="navbar-brand text-center" style={{ "color": "white", "fontWeight": "bold" }}>UTE Library</Link>
                </div>
                {profileElement}
            </div>
        </nav>
    )
}

export default TopNav