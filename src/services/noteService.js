import axios from 'axios';

const baseURL = 'http://localhost:10000/api/notes'

const getAll = () => {
    const request = axios.get(baseURL)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create = (newObject) => {
    return axios.post(baseURL, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject).then(response => response.data)
}
//let noteService = { getAll, create, update }
export default {
    getAll: getAll,
    create: create,
    update: update
}
//export default noteService