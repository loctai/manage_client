import axios from 'axios'
import queryString from 'query-string'
import React, { useContext, useEffect } from 'react'
import ToastContext from '../context/ToastContext'

const axiosClient = axios.create({
    baseURL: 'https://ute-lib-api.herokuapp.com/api/',
    headers: {
        'content-type': 'application/json'
    },
    withCredentials: true,
    paramsSerializer: params => queryString.stringify(params)
})

let needToToast = [
    "put",
    "post",
    "patch",
    "delete"
]

const AxiosInterceptor = ({ children }) => {

    const { toastConfig, setToastConfig } = useContext(ToastContext);

    useEffect(() => {

        const resInterceptor = res => {
            if (res && res.data) {
                if (needToToast.some(n => n == res.config.method)) {
                    setToastConfig({
                        ...toastConfig,
                        isVisible: true,
                        type: "success",
                        message: res.data.message,
                    })
                }
                return res.data
            }

            return res
        }

        const errInterceptor = error => {
            setToastConfig({
                ...toastConfig,
                isVisible: true,
                type: "error",
                message: error.response.data.message,
            })
            return Promise.reject(error);
        }

        const interceptor = axiosClient.interceptors.response.use(resInterceptor, errInterceptor);

        return () => axiosClient.interceptors.response.eject(interceptor);

    }, [])
    return children;
}

export default axiosClient;
export { AxiosInterceptor }