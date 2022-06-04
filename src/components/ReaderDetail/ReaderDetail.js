import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DataGrid, Column, Pager, Paging, Selection } from 'devextreme-react/data-grid'
import React, { useEffect, useState } from 'react'
import { getBorrowerById } from '../../api/user'
import dateDiff from "../../utils/dateDiff"
import BorrowerHandleForm from '../BorrowerHandleForm/BorrowerHandleForm'

function ReaderDetail(prop) {
    const [borrower, setBorrower] = useState({})
    const [formConfig, setFormConfig] = useState(
        {
            visible: false,
            mode: "",
            data: {}
        }
    )

    useEffect(() => {
        getBorrowerById(prop.data.data.id)
            .then(res => {
                setBorrower(res.data)
            })
            .catch(err => console.log(err))
    }, [formConfig])

    function getBorrowInfos() {
        if (borrower.borrowRegister == undefined) return

        let borrowInfos = []
        let rejected = []

        borrower.borrowRegister.forEach(register => {
            register.bookNames = ""
            register.books.forEach(book => {
                register.bookNames += (book.BookTitle.title + ", ")
            })
            if (register.isRejected) {
                rejected.push(register)
            } else {
                borrowInfos.push(register)
            }
        })

        borrower.borrowBills.forEach(bill => {
            bill.bookNames = ""
            bill.books.forEach(book => {
                bill.bookNames += (book.BookTitle.title + ", ")
                bill.createDate = bill.borrowDate
            })
            borrowInfos.push(bill)
        })

        borrowInfos = [...borrowInfos, ...rejected]

        return borrowInfos
    }

    function handleConfirm(currentRowData) {
        return () => {
            setFormConfig({ visible: true, mode: "confirm", data: currentRowData })
        }
    }

    function handleReject(currentRowData) {
        return () => {
            setFormConfig({ visible: true, mode: "reject", data: currentRowData })
        }
    }

    function handleReturn(currentRowData) {
        return () => {
            setFormConfig({ visible: true, mode: "return", data: currentRowData })
        }
    }

    function renderColumnStatus(e) {
        const data = e.data
        if (data.isRejected === true) {
            return (
                <div className='border border-2 border-warning'>
                    <span className='text-warning fw-bolder fs-5'>
                        <FontAwesomeIcon icon={"x"}></FontAwesomeIcon>
                    </span>
                </div>
            )
        } else if (data.isConfirmed === false) {
            return (
                <div className='d-flex justify-content-around'>
                    <button onClick={handleConfirm(data)} className='btn btn-success btn-sm me-2 w-50'>Confirm</button>
                    <button onClick={handleReject(data)} className='btn btn-danger btn-sm w-50'>Reject</button>
                </div>
            )
        }
        if (data.isReturned === false) {
            let remain = dateDiff(new Date(data.planReturnDate), new Date());
            if (remain < 0) {
                return <button onClick={handleReturn(data)} className='btn btn-warning btn-sm w-50'>Return</button>
            } else {
                return <button onClick={handleReturn(data)} className='btn btn-primary btn-sm w-50'>Return</button >
            }
        }
        if (data.isReturned === true) {
            return (
                <div className='border border-2 border-success'>
                    <span className='text-success fw-bolder fs-5'>
                        <FontAwesomeIcon icon={"check"}></FontAwesomeIcon>
                    </span>
                </div>
            )
        }
    }

    const hideForm = () => {
        setFormConfig({ visible: false, mode: "", data: {} })
    }

    const renderForm = () => {
        if (formConfig.visible == false) {
            return (<div></div>)
        } else {
            return (
                <BorrowerHandleForm
                    mode={formConfig.mode}
                    onHiding={hideForm}
                    data={formConfig.data}
                >
                </BorrowerHandleForm>
            )
        }
    }

    return (
        <div>
            <DataGrid
                allowColumnResizing={true}
                allowColumnReordering={true}
                columnAutoWidth={true}
                showRowLines={true}
                dataSource={getBorrowInfos()}>
                <Pager showPageSizeSelector={true} />
                <Paging defaultPageSize={5} />

                <Column dataField="bookNames" />
                <Column dataField="Note" />
                <Column dataField="planReturnDate" dataType="datetime" />
                <Column dataField="returnDate" dataType="datetime" />
                <Column dataField="createDate" dataType="datetime" />
                <Column
                    caption={"Returned"}
                    alignment={"center"}
                    width={"200"}
                    cellRender={renderColumnStatus}
                />
            </DataGrid>
            {renderForm()}
        </div>
    )
}

export default ReaderDetail