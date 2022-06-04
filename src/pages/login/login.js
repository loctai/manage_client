import { useContext, useState } from 'react'
import { login } from '../../api/auth'
import LoadingContext from '../../context/LoadingContext';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const setLoading = useContext(LoadingContext);
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        login({
            username: inputs.username,
            password: inputs.password
        }).then(res => {
            setLoading(false)
            if (res.message === 'login') {
                navigate('/home');
                setUser(res.data)
            }
        }).catch(err => {
            setLoading(false)
        })
    }

    return (
        <div className='row justify-content-center m-0 mt-3'>
            <div className="card col-3 shadow">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="usernameInput" className="form-label">Username</label>
                            <input name='username' type="text" className="form-control" id="usernameInput" value={inputs.username || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input name='password' type="password" className="form-control" id="passwordInput" value={inputs.password || ""} onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

