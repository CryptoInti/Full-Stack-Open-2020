import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = async (id) => {
    try {
        return axios.delete(`${baseUrl}/${id}`)
    }
    catch (error) {
        console.log('error', error)
    }
}

export default { getAll, create, update, deletePerson }
