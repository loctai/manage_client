import axiosClient from "./_axiosClient"

export async function getBorrowRegister() {
    const url = 'borrowregister'
    const response = await axiosClient.get(url)

    return response
}

export async function getBorrowRegisterById(id) {
    const url = `borrowregister/${id}`
    const response = await axiosClient.get(url)

    return response
}


export async function createBorrowRegister(
    {
        note,
        isConfirmed,
        planReturnDate,
        bookIds,
    }
) {
    const data = {
        note: note,
        isConfirmed: isConfirmed,
        planReturnDate: planReturnDate,
        bookIds: bookIds,
    }
    const url = 'borrowregister'
    const response = await axiosClient.post(
        url,
        data
    )

    return response
}

export async function updateBorrowRegister(id,
    {
        note,
        isConfirmed,
        planReturnDate,
        bookIds,
    }
) {
    const url = `borrowregister/${id}`
    const data = {
        note: note,
        isConfirmed: isConfirmed,
        planReturnDate: planReturnDate,
        bookIds: bookIds,
    }

    const response = await axiosClient.put(url, data)

    return response
}

export async function confirmBorrowRegister(id) {
    const url = `borrowregister/confirm/${id}`

    const response = await axiosClient.put(url)

    return response
}

export async function rejectBorrowRegister(id) {
    const url = `borrowregister/reject/${id}`

    const response = await axiosClient.put(url)

    return response
}

export async function deleteBorrowRegister(id) {
    const url = `borrowregister/${id}`
    const response = await axiosClient.delete(url)

    return response
}