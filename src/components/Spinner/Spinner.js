import React from 'react'

function Spinner() {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100 bg-dark bg-opacity-25 fixed-top" style={{ 'zIndex': 9999 }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner