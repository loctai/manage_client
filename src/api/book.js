import axiosClient from "./_axiosClient"

export async function getBook() {
    const url = 'book'
    const response = await axiosClient.get(url)

    return response
}

export async function getBookById(id) {
    const url = `book/${id}`
    const response = await axiosClient.get(url)

    return response
}

export async function createBook(
    {
        isGood,
        bookTitleId,
    }
) {
    const data = {
        isGood: isGood,
        bookTitleId: bookTitleId,
    }
    const url = 'book'
    const response = await axiosClient.post(
        url,
        data
    )

    return response
}

export async function updateBook(id,
    {
        isGood,
        bookTitleId,
    }
) {
    const url = `book/${id}`
    const data = {
        isGood: isGood,
        bookTitleId: bookTitleId,
    }

    const response = await axiosClient.put(url, data)

    return response
}

export async function deleteBook(id) {
    const url = `book/${id}`
    const response = await axiosClient.delete(url)

    return response
}

