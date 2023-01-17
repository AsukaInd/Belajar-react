import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-inspection-type?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-inspection-type', data)
const updateData = (id, data) => adminInstance.post(`/product-inspection-type/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-inspection-type/${id}`)

const apiTypeInspection = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiTypeInspection