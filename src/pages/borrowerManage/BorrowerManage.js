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
    SearchPanel,
    MasterDetail
} from 'devextreme-react/data-grid';
import { deleteUser, getBorrowers, getUsers } from '../../api/user';
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
import UserEditForm from '../../components/UserEditForm/UserEditForm';
import LoadingContext from '../../context/LoadingContext';
import ReaderAddForm from '../../components/ReaderAddForm/ReaderAddForm';
import ReaderDetail from '../../components/ReaderDetail/ReaderDetail';

function BorrowerManage() {
    const setLoading = useContext(LoadingContext);
    const [data, setData] = useState({})
    const [formVisible, setFormVisible] = useState(false)

    // Get require data
    useEffect(() => {
        setLoading(true)
        getBorrowers().then(res => {
            res.data.forEach(user => {
                user.borrowBills = user._count.borrowBills
                user.borrowRegister = user._count.borrowRegister
            });
            setData(res.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }, [formVisible])

    const showReaderForm = () => {
        setFormVisible(() => true)
    }

    const hideReaderForm = () => {
        setFormVisible(false)
    }

    const handleAdd = (e) => {
        showReaderForm()
    }

    const renderReaderForm = () => {
        if (formVisible == false) {
            return (<div></div>)
        } else {
            return (
                <ReaderAddForm
                    onHiding={hideReaderForm}>
                </ReaderAddForm>
            )
        }
    }

    return (
        <div className='m-3'>
            <DataGrid
                dataSource={data}
                showBorders={true}
                allowColumnResizing={true}
                allowColumnReordering={true}
            >
                <SearchPanel visible={true}
                    width={"auto"}
                    placeholder="Search..." />
                <FilterRow visible={true} />
                <Selection mode="single" />
                <Pager allowedPageSizes={20} showPageSizeSelector={true} />
                <Paging defaultPageSize={10} />
                <Editing mode={"row"} allowDeleting={false} allowUpdating={false} />
                <SpeedDialAction
                    icon="add"
                    label="Create New Reader"
                    index={1}
                    onClick={handleAdd} />

                <Column dataField="id" />
                <Column dataField="username" />
                <Column dataField="email" />
                <Column dataField="borrowRegister" />
                <Column dataField="borrowBills" />
                <Column dataField="fname" />
                <Column dataField="lname" />
                <Column dataField="createdAt" dataType="datetime" />

                <MasterDetail
                    enabled={true}
                    component={ReaderDetail}
                >
                </MasterDetail>
            </DataGrid>
            {renderReaderForm()}
        </div>
    )
}

export default BorrowerManage