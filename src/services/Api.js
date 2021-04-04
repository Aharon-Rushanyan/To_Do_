import axios from 'axios'
import Notification from '../Components/Notification/Notification'

const axiosInstance = axios.create()

const handleResponse = response => {
  if (!response.data.message) {
    return {
      data: response.data,
      status: "success"

    }
  } else {
    return {
      data: response.data,
      status: "failed"
    }
  }
}


const handleError = () => {
  Notification('failed', 'Somethig went wrong...',)
}

export const postForResponse = (url, data) => (
  () => axiosInstance.post(url, data)
    .then(response => handleResponse(response))
    .catch(handleError)
)

export const getForResponse = (url, data) => (
  () => axiosInstance.get(url, data)
    .then(response => handleResponse(response))
    .catch(handleError)
)

export const putForResponse = (url, data) => (
  () => axiosInstance.put(url, data)
    .then(response => handleResponse(response))
    .catch(handleError)
)

export const patchForResponse = (url, data) => (
  () => axiosInstance.patch(url, data)
    .then(response => handleResponse(response))
    .catch(handleError)
)

export const deleteForResponse = url => (
  () => axiosInstance.delete(url)
    .then(response => handleResponse(response))
    .catch(handleError)
)

export const deleteAllForResponse = (url, requestArr) => {
  const requestArrNew = requestArr.map(data =>
    axiosInstance.delete(url.replace(':todoId', data._id))
  )

  return () => Promise.all(requestArrNew)
    .then(() => (
      {
        status: 'success'
      }
    ))
    .catch(() => handleError)
}

