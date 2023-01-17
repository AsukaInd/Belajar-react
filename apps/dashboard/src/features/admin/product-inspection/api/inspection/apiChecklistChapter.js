import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-chechklist-chp?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-chechklist-chp', data)
const updateData = (id, data) => adminInstance.post(`/product-chechklist-chp/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-chechklist-chp-chp/${id}`)

const apiProductInspection = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiProductInspection