import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-checklist?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-checklist', data)
const updateData = (id, data) => adminInstance.post(`/product-checklist/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-checklist/${id}`)

const apiProductInspection = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiProductInspection