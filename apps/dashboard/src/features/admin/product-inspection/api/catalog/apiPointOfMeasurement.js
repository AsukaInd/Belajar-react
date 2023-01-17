import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-inspection-point-ms?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-inspection-point-ms', data)
const updateData = (id, data) => adminInstance.post(`/product-inspection-point-ms/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-inspection-point-ms/${id}`)

const apiPointOfMeasurement = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiPointOfMeasurement