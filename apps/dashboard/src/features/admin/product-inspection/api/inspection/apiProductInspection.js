import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-inspection?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-inspection', data)
const updateData = (id, data) => adminInstance.post(`/product-inspection/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-inspection/${id}`)

const apiProductInspection = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiProductInspection