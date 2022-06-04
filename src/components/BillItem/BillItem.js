import React from 'react'
import dateDiff from "../../utils/dateDiff"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function BillItem(prop) {
    const data = prop.data
    const firstBookImg = data.books[0].BookTitle.image
    const borrowDate = new Date(data.borrowDate).toLocaleString()
    const planReturnDate = new Date(data.planReturnDate).toLocaleString()
    let cardStyle
    let statusText

    if (data.isRejected == false || data.isRejected == null) {
        cardStyle = "bg-warning"
        statusText = "Your registation is waiting"
    }
    cardStyle = "bg-light"
    statusText = "Your registation is rejected"

    function renderBookList() {
        return data.books.map(book => {
            return <p key={book.id} className='card-text mb-1'>{book.BookTitle.title}</p>
        })
    }

    function renderReturnDate() {
        if (data.returnDate == null) return <></>
        let returnDate = new Date(data.returnDate).toLocaleString()
        return (
            <>
                <p className="card-text mb-1"><small className="text-muted">Return date:</small></p>
                <h6 className="card-title">{returnDate}</h6>
            </>
        )
    }

    function renderStatusIcon() {
        if (data.isReturned == true) {
            return <span className='fs-3 text-success'><FontAwesomeIcon icon={"check"}></FontAwesomeIcon></span>
        }

        let remain = dateDiff(new Date(data.planReturnDate), new Date());
        debugger
        if (remain < 0) {
            return <span className='fs-3 text-warning'><FontAwesomeIcon icon={"warning"}></FontAwesomeIcon></span>
        }

        return <></>
    }


    return (
        <div className={`card mb-3 mb-3 ${cardStyle}`}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={firstBookImg} className="img-fluid rounded-start" style={{ "width": "160px", "height": "176px", "objectFit": "scale-down" }}></img>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className='float-end'>
                            {renderStatusIcon()}
                        </div>
                        <p className="card-text mb-1"><small className="text-muted">Borrow date:</small></p>
                        <h5 className="card-title">{borrowDate}</h5>
                        <p className="card-text mb-1"><small className="text-muted">Plan return date:</small></p>
                        <h5 className="card-title">{planReturnDate}</h5>
                        <p className="card-text mb-1"><small className="text-muted">Books:</small></p>
                        {renderReturnDate()}
                        {renderBookList()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillItem