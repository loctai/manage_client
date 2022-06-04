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
import { createUser, deleteUser, getUserById, updateUser } from '../../api/user';
import { getGroup } from '../../api/group';

function UserEditForm(prop) {
    const setLoading = useContext(LoadingContext);
    const [groups, setGroups] = useState([])
    const [inputs, setInputs] = useState({});
    let isCreateForm = (prop.user == undefined)

    // Get require data
    useEffect(() => {

        if (!isCreateForm) {
            setLoading(true)
            getUserById(prop.user.id).then(res => {
                if (res.message === "findOne") {
                    res.data.password = ""
                    setInputs(() => res.data)
                    setLoading(false)
                }
            })
        } else {
            setInputs(() => ({
                id: '',
                username: '',
                password: '',
                confirm: '',
                groups: [],
                fname: '',
                lname: '',
                email: ''
            }))
        }
        getGroup().then(res => {
            if (res.message === "OK")
                setGroups(() => res.data)
        })
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleGroupsChange = (e) => {

        setInputs(values => ({ ...values, ["groups"]: e.selectedRowsData }))
    }

    const handleSave = () => {
        setLoading(true)
        if (isCreateForm) {
            createUser({
                username: inputs.username,
                fname: inputs.fname,
                lname: inputs.lname,
                email: inputs.email,
                password: inputs.password,
                groupIds: inputs.groups.map(g => g.id),
            }).then(res => {

                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        } else {

            updateUser(inputs.id, {
                username: inputs.username,
                fname: inputs.fname,
                lname: inputs.lname,
                email: inputs.email,
                password: inputs.password,
                groupIds: inputs.groups.map(g => g.id),
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        }
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
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">Id</label>
                            <input name='id' type="text" className="form-control" id="id" value={inputs.id || ""} readOnly />
                        </div>
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
                        <div className="mb-3">
                            <label htmlFor="createdAt" className="form-label">Created At</label>
                            <input name='createdAt' type="text" className="form-control" id="createdAt" value={inputs.createdAt} readOnly />
                        </div>
                    </form>
                    <hr></hr>
                    <h4>Group</h4>
                    <DataGrid
                        dataSource={groups}
                        showBorders={true}
                        allowColumnResizing={true}
                        columnAutoWidth={true}
                        selectedRowKeys={inputs.groups}
                        onSelectionChanged={handleGroupsChange}>
                        <FilterRow visible={true} />
                        <Selection mode="multiple" />
                        <Pager showPageSizeSelector={true} />
                        <Paging defaultPageSize={8} />
                    </DataGrid>
                    <div className='d-flex justify-content-around mt-3'>
                        <button type="button" className="btn btn-danger w-25" onClick={prop.onHiding}>Cancel</button>
                        <button type="button" className="btn btn-success w-25" onClick={handleSave} disabled={(inputs.password != "" && inputs.password !== inputs.confirm)}>Save</button>
                    </div>
                </div>
            </ScrollView>
        </Popup>
    )
}

export default UserEditForm