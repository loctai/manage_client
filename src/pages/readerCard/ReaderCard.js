import React, { useState, useEffect, useContext } from 'react'
import { getUserBorrowStatus } from '../../api/user'
import RegisterItem from '../../components/RegisterItem/RegisterItem';
import LoadingContext from '../../context/LoadingContext';
import BillItem from '../../components/BillItem/BillItem';

function ReaderCard() {
    const [data, setData] = useState({})
    const setLoading = useContext(LoadingContext);

    useEffect(() => {
        setLoading(true)
        getUserBorrowStatus().then(res => {
            setLoading(false)
            setData(() => res.data)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [])

    function renderRegisters() {
        if (data.borrowRegister == undefined) return <></>

        const result = data.borrowRegister.map(resgister => {
            return <RegisterItem key={resgister.id} data={resgister}></RegisterItem>
        })

        return result
    }

    function renderBills() {
        if (data.borrowBills == undefined) return <></>

        const result = []
        data.borrowBills.forEach(bill => {
            result.push(<BillItem key={bill.id} data={bill}></BillItem>)
        })
        return result
    }

    return (
        <div className='row m-0 h-100'>
            <div className='col text-start p-1'>
                <h3>Bills</h3>
                <hr></hr>
                {renderBills()}
            </div>
            <div className='col text-start p-1'>
                <h3>Registers</h3>
                <hr></hr>
                {renderRegisters()}
            </div>
        </div>
    )
}

export default ReaderCard