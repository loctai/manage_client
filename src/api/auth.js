import axiosClient from "./_axiosClient"

export async function login({ username, password }) {
  const data = {
    username: username || '',
    password: password || ''
  }

  const url = 'login'
  const response = await axiosClient.post(
    url,
    data
  )

  return response
}

export async function logout() {

  const url = 'logout'
  const response = await axiosClient.post(
    url
  )

  return response
}


export async function register({ username, password }) {
  const data = {
    username: username || '',
    password: password || ''
  }

  const url = 'signup'
  const response = await axiosClient.post(
    url,
    data
  )

  return response
}

export async function me() {
  const url = 'me'
  const response = await axiosClient.get(url)

  return response
}
