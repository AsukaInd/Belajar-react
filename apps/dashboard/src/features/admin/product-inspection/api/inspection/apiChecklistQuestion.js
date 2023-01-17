import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-chechklist-question?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-chechklist-question', data)
const updateData = (id, data) => adminInstance.post(`/product-chechklist-questionn/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-chechklist-question/${id}`)

const apiProductInspection = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiProductInspection