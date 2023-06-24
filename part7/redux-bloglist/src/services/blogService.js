import axios from 'axios'
const baseUrl = '/api/blogs'

let config

const setConfig = (newToken) => {
  config = {
    headers: { Authorization: `bearer ${newToken}` },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)

  console.log('responsedata', response.data)

  return response.data
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, remove, setConfig }
