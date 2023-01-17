import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/province?page=${numberPage}`)
const addData = (data) => adminInstance.post('/province', data)
const updateData = (id, data) => adminInstance.post(`/province/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/province/${id}`)

const apiProvince = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiProvince