import axiosClient from "./_axiosClient"

export async function getCategory() {
    const url = 'category'
    const response = await axiosClient.get(url)

    return response
}

export async function getCategoryById(id) {
    const url = `category/${id}`
    const response = await axiosClient.get(url)

    return response
}

export async function createCategory(
    {
        name,
        bookTitleIds
    }
) {
    const data = {
        name: name,
        bookTitleIds: bookTitleIds
    }
    const url = 'category'
    const response = await axiosClient.post(
        url,
        data
    )

    return response
}

export async function updateCategory(id,
    {
        name,
        bookTitleIds
    }
) {
    const url = `category/${id}`
    const data = {
        name: name,
        bookTitleIds: bookTitleIds
    }

    const response = await axiosClient.put(url, data)

    return response
}

export async function deleteCategory(id) {
    const url = `category/${id}`
    const response = await axiosClient.delete(url)

    return response
}