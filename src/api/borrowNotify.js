import axiosClient from "./_axiosClient"

export async function getBorrowNotify() {
    const url = 'borrownotify'
    const response = await axiosClient.get(url)

    return response
}

export async function getBorrowNotifyById(id) {
    const url = `borrownotify/${id}`
    const response = await axiosClient.get(url)

    return response
}


export async function createBorrowNotify(
    {
        title,
        content,
        isRead,
        borrowBillId,
    }
) {
    const data = {
        title: title,
        content: content,
        isRead: isRead,
        borrowBillId: borrowBillId,
    }
    const url = 'borrownotify'
    const response = await axiosClient.post(
        url,
        data
    )

    return response
}

export async function updateBorrowNotify(id,
    {
        title,
        content,
        isRead,
        borrowBillId,
    }
) {
    const url = `borrownotify/${id}`
    const data = {
        title: title,
        content: content,
        isRead: isRead,
        borrowBillId: borrowBillId,
    }

    const response = await axiosClient.put(url, data)

    return response
}

export async function deleteBorrowNotify(id) {
    const url = `borrownotify/${id}`
    const response = await axiosClient.delete(url)

    return response
}