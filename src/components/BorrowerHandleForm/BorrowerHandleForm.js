import { React, useState, useEffect, useContext } from 'react'
import { Popup } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import List from 'devextreme-react/list';
import LoadingContext from '../../context/LoadingContext';
import { confirmBorrowRegister, rejectBorrowRegister } from '../../api/borrowRegister';
import { returnBorrowBill } from '../../api/borrowBill';
import Gallery from 'devextreme-react/gallery';

function BorrowerHandleForm(prop) {
    const setLoading = useContext(LoadingContext);
    const data = prop.data;
    const [image, setImage] = useState(data.books[0].BookTitle.image);


    console.log(data)

    function handleConfirm() {
        setLoading(true)
        confirmBorrowRegister(data.id)
            .then(res => {
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })
    }

    function handleReject() {
        setLoading(true)
        rejectBorrowRegister(data.id)
            .then(res => {
                setLoading(false)
            })
            .catch(err => { console.log(err) })
    }

    function handleReturn() {
        setLoading(true)
        returnBorrowBill(data.id)
            .then(res => {
                setLoading(false)
            }).catch(err => {
                console.log(err)
            })
    }

    function renderButton() {
        if (prop.mode == "confirm") {
            return (<button type="button" className="btn btn-success w-25" onClick={handleConfirm}>Confirm</button>)
        } else if (prop.mode == "reject") {
            return (<button type="button" className="btn btn-danger w-25" onClick={handleReject}>Reject</button>)
        } else if (prop.mode == "return") {
            return (<button type="button" className="btn btn-warning w-25" onClick={handleReturn}>Return</button>)
        }
    }

    function bookItemTemplate(data) {
        return (
            <div onClick={changeImage(data.BookTitle.image)}>
                {data.BookTitle.title}
            </div>
        );
    }

    function changeImage(image) {
        return () => {
            setImage(image)
        }
    }

    return (
        <Popup visible={true} onHiding={prop.onHiding}>
            <ScrollView width='100%' height='100%'>
                <div className='row m-0'>
                    <div className='col container-fluid text-center'>
                        <img src={image}></img>
                    </div>
                    <div className='col'>
                        <List
                            dataSource={data.books}
                            height={300}
                            itemRender={bookItemTemplate}
                            searchExpr="BookTitle.title"
                            searchEnabled={true}
                            searchMode={"contains"} />
                    </div>
                </div>
                <div className='p-2'>
                    <div className='d-flex justify-content-around mt-3'>
                        <button type="button" className="btn btn-danger w-25" onClick={prop.onHiding}>Cancel</button>
                        {renderButton()}
                    </div>
                </div>
            </ScrollView>
        </Popup >
    )
}

export default BorrowerHandleForm