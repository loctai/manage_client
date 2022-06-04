import axiosClient from "./_axiosClient"

export async function getGroup() {
    const url = 'group'
    const response = await axiosClient.get(url)

    return response
}

export async function getGroupById(id) {
    const url = `group/${id}`
    const response = await axiosClient.get(url)

    return response
}

export async function createGroup(
    {
        name,
        permissionIds,
        userIds,
    }
) {
    const data = {
        name: name,
        permissionIds: permissionIds,
        userIds: userIds,
    }
    const url = 'group'
    const response = await axiosClient.post(
        url,
        data
    )

    return response
}

export async function updateGroup(id,
    {
        name,
        permissionIds,
        userIds,
    }
) {
    const url = `group/${id}`
    const data = {
        name: name,
        permissionIds: permissionIds,
        userIds: userIds,
    }

    const response = await axiosClient.put(url, data)

    return response
}

export async function deleteGroup(id) {
    const url = `group/${id}`
    const response = await axiosClient.delete(url)

    return response
}