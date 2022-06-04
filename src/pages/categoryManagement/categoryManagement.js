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
import LoadingContext from '../../context/LoadingContext';
import { deleteCategory, getCategory } from '../../api/category';
import CategoryManagementEditForm from './categoryManagement'
import CatagoryManagementEditForm from '../../components/CategoryManagementEditForm/CategoryManagementEditForm';

function CategoryManagement() {
    const setLoading = useContext(LoadingContext);
    const [data, setData] = useState({})
    const [formVisible, setFormVisible] = useState(false)
    const [currentCategory, setCurrentCategory] = useState(undefined)

    // Get require data
    useEffect(() => {
        setLoading(true)
        getCategory().then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }, [formVisible])

    const showEditForm = (category) => {
        debugger
        setCurrentCategory(() => category)
        setFormVisible(() => true)
    }

    const hideEditForm = () => {
        setCurrentCategory({})
        setFormVisible(false)
    }

    const handleEdit = (e) => {
        let category = e.row.data
        showEditForm(category)
    }

    const handleAdd = (e) => {
        showEditForm(undefined)
    }

    const handleDelete = (e) => {
        setLoading(true)
        deleteCategory(e.data.id).then(res => {
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
                <CatagoryManagementEditForm
                    onHiding={hideEditForm}
                    category={currentCategory}>
                </CatagoryManagementEditForm>
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
                    label="Create Category"
                    index={1}
                    onClick={handleAdd} />

                <Column dataField="id" />
                <Column dataField="name" />
                <Column dataField="createdAt" />
                <Column type="buttons">
                    <Button hint="Edit" onClick={handleEdit}><button className='btn btn-success btn-sm'>Edit</button></Button>
                    <Button name="delete" ><button className='btn btn-danger btn-sm'>Delete</button></Button>
                </Column>
            </DataGrid>
            {renderEditForm()}
        </div>
    )
}

export default CategoryManagement