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
import { createBookTitle, getBookTitle, getBookTitleById, updateBookTitle } from '../../api/bookTitle';
import { createCategory, getCategory, getCategoryById, updateCategory } from '../../api/category';
import CategoryManagement from '../../pages/categoryManagement/categoryManagement';

function CatagoryManagementEditForm(prop) {
    const setLoading = useContext(LoadingContext);
    const [bookTitles, setBookTitles] = useState([])
    const [inputs, setInputs] = useState({});
    let isCreateForm = (prop.category == undefined)

    // Get require data
    useEffect(() => {
        if (!isCreateForm) {
            setLoading(true)
            getCategoryById(prop.category.id).then(res => {
                if (res.message === "OK") {
                    res.data.password = ""
                    setInputs(() => res.data)
                    setLoading(false)
                }
            })
        } else {
            setInputs(() => ({
                id: '',
                name: '',
                createdAt: '',
                bookTitles: []
            }))
        }
        getBookTitle().then(res => {
            if (res.message === "OK")
                setBookTitles(() => res.data)
        }).catch(err => console.log(err))
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handlebookTitleChange = (e) => {

        setInputs(values => ({ ...values, ["bookTitles"]: e.selectedRowsData }))
    }

    const handleSave = () => {
        setLoading(true)
        if (isCreateForm) {
            createCategory({
                name: inputs.name,
                createdAt: inputs.createdAt,
                bookTitleIds: inputs.bookTitles.map(g => g.id)
            }).then(res => {

                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
        } else {

            updateCategory(inputs.id, {
                name: inputs.name,
                createdAt: inputs.createdAt,
                bookTitleIds: inputs.bookTitles.map(g => g.id)
            }).then(res => {
                setLoading(false)
            }).catch(err => {
                setLoading(false)
            })
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
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Name</label>
                            <input name='name' type="text" className="form-control" id="name" value={inputs.name || ""} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="createdAt" className="form-label">Created At</label>
                            <input name='createdAt' type="text" className="form-control" id="createdAt" value={inputs.createdAt} readOnly />
                        </div>
                    </form>
                    <hr></hr>
                    <h4>Book Titles</h4>
                    <DataGrid
                        dataSource={bookTitles}
                        showBorders={true}
                        allowColumnResizing={true}
                        columnAutoWidth={true}
                        selectedRowKeys={inputs.bookTitles}
                        onSelectionChanged={handlebookTitleChange}>
                        <FilterRow visible={true} />
                        <Selection mode="multiple" />
                        <Pager showPageSizeSelector={true} />
                        <Paging defaultPageSize={8} />
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

export default CatagoryManagementEditForm