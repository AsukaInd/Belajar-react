import { adminInstance } from "../../../../../lib/axios";


const get = (numberPage) => adminInstance.get(`/suppliertype?page=${numberPage}`)
const addData = (data) => adminInstance.post('/suppliertype', data)
const updateData = (id, data) => adminInstance.post(`/suppliertype/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/suppliertype/${id}`)

const apiSupplierType = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiSupplierType