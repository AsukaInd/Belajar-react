import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/country?page=${numberPage}`)
const addData = (data) => adminInstance.post('/country', data)
const updateData = (id, data) => adminInstance.post(`/country/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/country/${id}`)

const apiCountry = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiCountry