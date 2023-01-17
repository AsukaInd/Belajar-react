import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-inspection-productsize?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-inspection-productsize', data)
const updateData = (id, data) => adminInstance.post(`/product-inspection-productsize/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-inspection-productsize/${id}`)

const apiProductSize = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiProductSize