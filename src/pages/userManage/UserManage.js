import React, { useEffect, useState, useContext } from 'react'
import {
    DataGrid,
    Pager,
    Paging,
    Selection,
    FilterRow,
    Editing,
    Column,
    Button,
    SearchPanel
} from 'devextreme-react/data-grid';
import { deleteUser, getUsers } from '../../api/user';
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import UserEditForm from '../../components/UserEditForm/UserEditForm';
import LoadingContext from '../../context/LoadingContext';

function UserManage() {
    const setLoading = useContext(LoadingContext);
    const [data, setData] = useState({})
    const [formVisible, setFormVisible] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)

    // Get require data
    useEffect(() => {
        setLoading(true)
        getUsers().then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }, [formVisible])

    const showEditForm = (user) => {
        setCurrentUser(() => user)
        setFormVisible(() => true)
    }

    const hideEditForm = () => {
        setCurrentUser({})
        setFormVisible(false)
    }

    const handleEdit = (e) => {
        let user = e.row.data
        showEditForm(user)
    }

    const handleAdd = (e) => {
        showEditForm(undefined)
    }

    const handleDelete = (e) => {
        setLoading(true)
        deleteUser(e.data.id).then(res => {
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            e.cancel = true
        })
    }


    // make sure rerender form when state change
    const renderEditForm = () => {
        if (formVisible == false) {
            return (<div></div>)
        } else {
            return (
                <UserEditForm
                    onHiding={hideEditForm}
                    user={currentUser}>
                </UserEditForm>
            )
        }
    }

    return (
        <div className='m-3'>
            <DataGrid
                dataSource={data}
                showBorders={true}
                selectedRowKeys={[]}
                onRowRemoving={handleDelete}
            >
                <SearchPanel visible={true}
                    width={"auto"}
                    placeholder="Search..." />
                <FilterRow visible={true} />
                <Selection mode="single" />
                <Pager allowedPageSizes={200} showPageSizeSelector={true} />
                <Paging defaultPageSize={100} />
                <Editing mode={"row"} allowDeleting={true} allowUpdating={true} />
                <SpeedDialAction
                    icon="add"
                    label="Create User"
                    index={1}
                    onClick={handleAdd} />

                <Column dataField="id" />
                <Column dataField="username" />
                <Column dataField="email" />
                <Column dataField="fname" />
                <Column dataField="lname" />
                <Column dataField="createdAt" dataType="datetime" />
                <Column type="buttons">
                    <Button hint="Edit" onClick={handleEdit}><button className='btn btn-success btn-sm'>Edit</button></Button>
                    <Button name="delete" ><button className='btn btn-danger btn-sm'>Delete</button></Button>
                </Column>
            </DataGrid>
            {renderEditForm()}
        </div>
    )
}

export default UserManage