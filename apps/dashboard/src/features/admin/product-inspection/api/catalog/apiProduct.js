import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product', data)
const updateData = (id, data) => adminInstance.post(`/product/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product/${id}`)

const apiProduct = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiProduct