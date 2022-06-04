import axiosClient from "./_axiosClient"

export async function getUsers() {
    const url = 'users'
    const response = await axiosClient.get(url)

    return response
}

export async function getBorrowers() {
    const url = 'users/borrower'
    const response = await axiosClient.get(url)

    return response
}

export async function createUser(
    {
        username,
        password,
        groupIds,
        fname,
        lname,
        email
    }
) {
    const data = {
        username: username,
        password: password,
        groupIds: groupIds,
        fname: fname,
        lname: lname,
        email: email
    }
    const url = 'users'
    const response = await axiosClient.post(
        url,
        data
    )

    return response
}

export async function createBorrower(
    {
        username,
        password,
        fname,
        lname,
        email
    }
) {
    const data = {
        username: username,
        password: password,
        fname: fname,
        lname: lname,
        email: email
    }
    const url = 'users/reader'
    const response = await axiosClient.post(
        url,
        data
    )

    return response
}

export async function getUserById(id) {
    const url = `users/${id}`
    const response = await axiosClient.get(url)

    return response
}

export async function getBorrowerById(id) {
    const url = `users/borrower/${id}`
    const response = await axiosClient.get(url)

    return response
}

export async function updateUser(id,
    {
        username,
        password,
        groupIds,
        fname,
        lname,
        email
    }
) {
    const url = `users/${id}`
    const data = {
        username: username,
        password: password,
        groupIds: groupIds,
        fname: fname,
        lname: lname,
        email: email
    }

    const response = await axiosClient.put(url, data)

    return response
}

export async function deleteUser(id) {
    const url = `users/${id}`
    const response = await axiosClient.delete(url)

    return response
}

export async function getUserBorrowStatus() {
    const url = `users/borrow/status`
    const response = await axiosClient.get(url)

    return response
}

export async function getUserBorrowNotify() {
    const url = `users/borrow/notifies`
    const response = await axiosClient.get(url)

    return response
}

export async function updateUserProfile(
    {
        password,
        newPassword,
        fname,
        lname,
        email
    }
) {
    const url = `users/profile`
    const data = {
        password: password,
        newPassword: newPassword,
        fname: fname,
        lname: lname,
        email: email
    }

    const response = await axiosClient.put(url, data)

    return response
}
