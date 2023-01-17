import { adminInstance, adminInstanceWithFile } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-inspection-book?page=${numberPage}`)
const view = (id) => adminInstance.get(`/product-inspection-book/${id}`)
const addData = (data) => adminInstanceWithFile.post('/product-inspection-book', data)
const updateData = (id, data) => adminInstanceWithFile.post(`/product-inspection-book/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-inspection-book/${id}`)

const apiServices = {
    get,
    view,
    addData,
    updateData,
    deleteData
}

export default apiServices