import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/city?page=${numberPage}`)
const addData = (data) => adminInstance.post('/city', data)
const updateData = (id, data) => adminInstance.post(`/city/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/city/${id}`)

const apiCity = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiCity