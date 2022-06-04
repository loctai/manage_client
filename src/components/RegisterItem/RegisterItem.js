import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function RegisterItem(prop) {
    const data = prop.data
    const firstBookImg = data.books[0].BookTitle.image
    const createDate = new Date(data.createDate).toLocaleString()
    const planReturnDate = new Date(data.planReturnDate).toLocaleString()

    function renderBookList() {
        return data.books.map(book => {
            return <p key={book.id} className='mb-1'>{book.BookTitle.title}</p>
        })
    }

    function renderStatusIcon() {
        debugger
        if (data.isRejected == true) {
            return <span className='fs-3 text-danger'><FontAwesomeIcon icon={"xmark-circle"}></FontAwesomeIcon></span>
        }
        return <span className='fs-3 text-success'><FontAwesomeIcon icon={"share"}></FontAwesomeIcon></span>
    }

    return (
        <div className={`card mb-3 mb-3 bg-light`}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={firstBookImg} className="img-fluid rounded-start" style={{ "width": "160px", "height": "176px", "objectFit": "scale-down" }}></img>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className='float-end'>
                            {renderStatusIcon()}
                        </div>
                        <p className="card-text mb-1"><small className="text-muted">Register date:</small></p>
                        <h5 className="card-title">{createDate}</h5>
                        <p className="card-text mb-1"><small className="text-muted">Plan return date:</small></p>
                        <h5 className="card-title">{planReturnDate}</h5>
                        <p className="card-text mb-1"><small className="text-muted">Books:</small></p>
                        {renderBookList()}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterItem