import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-inspection-defect-level?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-inspection-defect-level', data)
const updateData = (id, data) => adminInstance.post(`/product-inspection-defect-level/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-inspection-defect-level/${id}`)

const apiDefectLevel = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiDefectLevel