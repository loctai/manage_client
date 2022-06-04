import React, { useEffect, useState, useContext } from 'react'
import {
    DataGrid,
    Pager,
    Paging,
    Selection,
    FilterRow,
    Button,
    Column,
    Editing,
    SearchPanel
} from 'devextreme-react/data-grid';
import { deleteGroup, getGroup } from '../../api/group';
import GroupEditForm from '../../components/GroupEditFrom/GroupEditForm';
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import LoadingContext from '../../context/LoadingContext';


function GroupManage() {
    const setLoading = useContext(LoadingContext);
    const [data, setData] = useState({})
    const [formVisible, setFormVisible] = useState(false)
    const [currentGroup, setCurrentGroup] = useState({})

    // Get require data
    useEffect(() => {
        setLoading(true)
        getGroup().then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }, [formVisible])

    const showEditForm = (group) => {
        setCurrentGroup(group)
        setFormVisible(true)
    }

    const hideEditForm = () => {
        setCurrentGroup({})
        setFormVisible(false)
    }

    const handleEdit = (e) => {
        let group = e.row.data
        showEditForm(group)
    }

    const handleAdd = () => {
        setCurrentGroup(() => { })
        setFormVisible(true)
    }

    const handleDelete = (e) => {
        setLoading(true)
        deleteGroup(e.data.id).then(res => {
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
                <GroupEditForm
                    onHiding={hideEditForm}
                    group={currentGroup}>
                </GroupEditForm>
            )
        }
    }

    return (
        <div className='m-3'>
            <DataGrid
                dataSource={data}
                showBorders={true}
                onRowRemoving={handleDelete}
                selectedRowKeys={[]}>
                <FilterRow visible={true} />
                <Selection mode="single" />
                <Pager allowedPageSizes={200} showPageSizeSelector={true} />
                <Paging defaultPageSize={100} />
                <SpeedDialAction
                    icon="add"
                    label="Create Group"
                    index={1}
                    onClick={handleAdd} />
                <Editing allowDeleting={true} allowUpdating={true} />
                <SearchPanel visible={true}
                    width={"auto"}
                    placeholder="Search..." />

                <Column dataField="id" />
                <Column dataField="name" />
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

export default GroupManage