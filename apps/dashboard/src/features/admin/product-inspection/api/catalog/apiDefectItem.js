import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-inspection-defect-item?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-inspection-defect-item', data)
const updateData = (id, data) => adminInstance.post(`/product-inspection-defect-item/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-inspection-defect-item/${id}`)

const apiDefectItem = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiDefectItem