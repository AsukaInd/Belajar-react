import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-inspection-chp-question?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-inspection-chp-question', data)
const updateData = (id, data) => adminInstance.post(`/product-inspection-chp-question/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-inspection-chp-question/${id}`)

const apiProductInspection = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiProductInspection