import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-inspection-order?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-inspection-order', data)
const updateData = (id, data) => adminInstance.post(`/product-inspection-order/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-inspection-order/${id}`)

const apiProductInspectionOrder = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiProductInspectionOrder