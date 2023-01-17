import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/customer?page=${numberPage}`)
const addData = (data) => adminInstance.post('/customer', data)
const updateData = (id, data) => adminInstance.post(`/customer/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/customer/${id}`)

const apiCustomer = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiCustomer