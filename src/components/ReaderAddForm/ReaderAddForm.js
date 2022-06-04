import { React, useState, useEffect, useContext } from 'react'
import {
    DataGrid,
    Pager,
    Paging,
    Selection,
    FilterRow,
} from 'devextreme-react/data-grid';
import { Popup } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import LoadingContext from '../../context/LoadingContext';
import { createBorrower, createUser, deleteUser, getUserById, updateUser } from '../../api/user';
import { getGroup } from '../../api/group';


function ReaderAddForm(prop) {
    const setLoading = useContext(LoadingContext);
    const [inputs, setInputs] = useState({
        id: '',
        username: '',
        password: '',
        confirm: '',
        fname: '',
        lname: '',
        email: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSave = () => {
        setLoading(true)
        createBorrower({
            username: inputs.username,
            fname: inputs.fname,
            lname: inputs.lname,
            email: inputs.email,
            password: inputs.password,
        }).then(res => {
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }

    const renderNotMatch = () => {
        if (inputs.password == "") {
            return (<span></span>)
        }
        if (inputs.password !== inputs.confirm) {
            return (<span style={{ 'color': 'red' }}>Password not match</span>)
        } else {
            return (<span></span>)
        }
    }
    return (
        <Popup visible={true} onHiding={prop.onHiding}>
            <ScrollView width='100%' height='100%'>
                <div className='p-2'>
                    <form>
                        <div className='row m-0 mb-2 justify-content-between'>
                            <div className='col-6 row'>
                                <label htmlFor="fname" className="form-label p-0">First Name</label>
                                <input name='fname' type="text" className="form-control" id="fname" value={inputs.fname || ""} onChange={handleChange} />
                            </div>
                            <div className='col-5 row'>
                                <label htmlFor="lname" className="form-label p-0">Last Name</label>
                                <input name='lname' type="text" className="form-control" id="lname" value={inputs.lname || ""} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email</label>
                            <input name='email' type="email" className="form-control" id="emailInput" value={inputs.email || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="usernameInput" className="form-label">Username</label>
                            <input name='username' type="text" className="form-control" id="usernameInput" value={inputs.username || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input name='password' type="password" className="form-control" id="passwordInput" value={inputs.password || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmInput" className="form-label">Confirm Password</label>
                            <input name='confirm' type="password" className="form-control" id="confirmInput" value={inputs.confirm || ""} onChange={handleChange} />
                            {renderNotMatch()}
                        </div>
                    </form>
                    <div className='d-flex justify-content-around mt-3'>
                        <button type="button" className="btn btn-danger w-25" onClick={prop.onHiding}>Cancel</button>
                        <button type="button" className="btn btn-success w-25" onClick={handleSave} disabled={(inputs.password != "" && inputs.password !== inputs.confirm)}>Save</button>
                    </div>
                </div>
            </ScrollView>
        </Popup>
    )
}

export default ReaderAddForm