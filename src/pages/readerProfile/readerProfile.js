import { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/UserContext';
import LoadingContext from '../../context/LoadingContext';
import { updateUserProfile } from '../../api/user'

export default function ReaderProfile() {
    const { user, setUser } = useContext(UserContext);
    const setLoading = useContext(LoadingContext);

    const getDefauntInput = () => ({
        username: ((user.username) ? user.username : ""),
        fname: ((user.fname) ? user.fname : ""),
        lname: ((user.lname) ? user.lname : ""),
        email: ((user.email) ? user.email : ""),
        password: "",
        newPassword: "",
        confirm: ""
    })
    const [isEditing, setEditing] = useState(false);
    const [inputs, setInputs] = useState(getDefauntInput());

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        updateUserProfile({
            password: inputs.password,
            newPassword: inputs.newPassword,
            fname: inputs.fname,
            lname: inputs.lname,
            email: inputs.email
        }).then(res => {
            setLoading(false)
            setUser(u => ({
                ...u,
                fname: res.data.fname,
                lname: res.data.lname,
                email: res.data.email
            }))
            setEditing(value => false)
        }).catch(err => {
            setLoading(false)
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setEditing(value => true)
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setEditing(value => false)
        setInputs(value => (getDefauntInput()))
    }

    const renderNotMatch = () => {
        if (inputs.newPassword !== inputs.confirm) {
            return (<span style={{ 'color': 'red' }}>Password not match</span>)
        } else {
            return (<span></span>)
        }
    }

    var button;
    if (isEditing) {
        button = (
            <div className='m-auto'>
                <button className='btn btn-primary m-3' type='submit' >Save</button>
                <button className='btn btn-danger m-3' onClick={handleCancel}>Cancel</button>
            </div>
        )
    } else {
        button = (
            <div className='m-auto'>
                <button className='btn btn-primary m-3' onClick={handleEdit}>Edit</button>
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="mb-3">Profile</h1>
            <form className='w-50 m-auto' onSubmit={handleSubmit}>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">Username:</label>
                    <div className="col-sm-12">
                        <input type="text" readOnly={!isEditing} className="form-control" onChange={handleChange} name='username' value={inputs.username}></input>
                    </div>
                </div>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">First name:</label>
                    <div className="col-sm-12">
                        <input type="text" readOnly={!isEditing} className="form-control" onChange={handleChange} name='fname' value={inputs.fname}></input>
                    </div>
                </div>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">Last name:</label>
                    <div className="col-sm-12">
                        <input type="text" readOnly={!isEditing} className="form-control" onChange={handleChange} name='lname' value={inputs.lname}></input>
                    </div>
                </div>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">Email:</label>
                    <div className="col-sm-12">
                        <input type="email" readOnly={!isEditing} className="form-control" onChange={handleChange} name='email' value={inputs.email}></input>
                    </div>
                </div>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">Current Password:</label>
                    <div className="col-sm-12">
                        <input type="password" readOnly={!isEditing} className="form-control" onChange={handleChange} name='password'></input>
                    </div>
                </div>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">New Password:</label>
                    <div className="col-sm-12">
                        <input type="password" readOnly={!isEditing} className="form-control" onChange={handleChange} name='newPassword'></input>
                    </div>
                </div>
                <div className="mb-3 row align-items-baseline">
                    <label className="col-sm-4 col-form-label text-start">Confirm password:</label>
                    <div className="col-sm-12">
                        <input type="password" readOnly={!isEditing} className="form-control" onChange={handleChange} name='confirm'></input>
                    </div>
                    {renderNotMatch()}
                </div>
                {button}
            </form>
        </div>
    )
}

