import React from 'react'
import { Link } from 'react-router-dom'

const LoginRegister = () => {
    return (
        <div className='' style={{ "color": "white" }}>
            <Link to={'/login'} className=" me-1" style={{ "color": "white" }}>Login</Link>
            /
            <Link to={'register'} className="" style={{ "color": "white" }}>Register</Link>
        </div>
    )
}

export default LoginRegister