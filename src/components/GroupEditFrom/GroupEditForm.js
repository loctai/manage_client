import { React, useState, useEffect, useContext } from 'react'
import { createGroup, deleteGroup, getGroupById, updateGroup } from '../../api/group';
import { getUsers } from '../../api/user';
import { getPermissions } from '../../api/permission';
import {
    DataGrid,
    Pager,
    Paging,
    Selection,
    FilterRow,
    Column
} from 'devextreme-react/data-grid';
import { Popup } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import LoadingContext from '../../context/LoadingContext';

function GroupEditForm(prop) {
    const setLoading = useContext(LoadingContext);
    const [permissions, setPermissions] = useState([])
    const [users, setUsers] = useState([])
    const [inputs, setInputs] = useState({
        id: '',
        name: '',
        createdAt: '',
        permissions: [],
        users: []
    });
    let isCreateForm = (prop.group == undefined)

    // Get require data
    useEffect(() => {
        if (!isCreateForm) {
            getGroupById(prop.group.id).then(res => {
                console.log("getGroup")
                if (res.message === "OK") {
                    setInputs(() => res.data)
                }
            }).catch(err => console.log(err))
        } else {
            setInputs(() => ({
                id: '',
                name: '',
                createdAt: '',
                permissions: [],
                users: []
            }))
        }
        getUsers().then(res => {
            if (res.message === "findAll")
                setUsers(() => res.data)
        }).catch(err => console.log(err))
        getPermissions().then(res => {
            if (res.message === "OK")
                setPermissions(() => res.data)
        }).catch(err => console.log(err))
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handlePermssionsChange = (e) => {
        setInputs(values => ({ ...values, ["permissions"]: e.selectedRowsData }))
    }

    const handleUsersChange = (e) => {
        setInputs(values => ({ ...values, ["users"]: e.selectedRowsData }))
    }

    const handleSave = () => {
        setLoading(true)
        if (isCreateForm) {
            createGroup({
                name: inputs.name,
                permissionIds: inputs.permissions.map(p => p.id),
                userIds: inputs.users.map(u => u.id),
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            }).catch(err => console.log(err))
        } else {
            updateGroup(inputs.id, {
                name: inputs.name,
                permissionIds: inputs.permissions.map(p => p.id),
                userIds: inputs.users.map(u => u.id),
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            }).catch(err => console.log(err))
        }
    }

    return (
        <Popup visible={true} onHiding={prop.onHiding}>
            <ScrollView width='100%' height='100%'>
                <div className='p-2'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">Id</label>
                            <input name='id' type="text" className="form-control" id="id" value={inputs.id} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="form-label">Name</label>
                            <input name='name' type="text" className="form-control" id="nameInput" value={inputs.name || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="createdAt" className="form-label">Created At</label>
                            <input name='createdAt' type="text" className="form-control" id="createdAt" value={inputs.createdAt} readOnly />
                        </div>
                    </form>
                    <hr></hr>
                    <h4>Permissions</h4>
                    <DataGrid
                        dataSource={permissions}
                        showBorders={true}
                        selectedRowKeys={inputs.permissions}
                        onSelectionChanged={handlePermssionsChange}>
                        <FilterRow visible={true} />
                        <Selection mode="multiple" />
                        <Pager showPageSizeSelector={true} />
                        <Paging defaultPageSize={8} />
                    </DataGrid>
                    <hr></hr>
                    <h4>Users</h4>
                    <DataGrid
                        dataSource={users}
                        showBorders={true}
                        allowColumnResizing={true}
                        columnAutoWidth={true}
                        selectedRowKeys={inputs.users}
                        onSelectionChanged={handleUsersChange}>
                        <FilterRow visible={true} />
                        <Selection mode="multiple" />
                        <Pager showPageSizeSelector={true} />
                        <Paging defaultPageSize={8} />

                        <Column dataField="id" />
                        <Column dataField="username" />
                        <Column dataField="email" />
                        <Column dataField="fname" />
                        <Column dataField="lname" />
                        <Column dataField="createdAt" dataType="datetime" />
                    </DataGrid>
                    <div className='d-flex justify-content-around mt-3'>
                        <button type="button" className="btn btn-danger w-25" onClick={prop.onHiding}>Cancel</button>
                        <button type="button" className="btn btn-success w-25" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </ScrollView>
        </Popup>
    )
}

export default GroupEditForm