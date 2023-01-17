import { adminInstance } from "../../../../../lib/axios";

const get = (numberPage) => adminInstance.get(`/product-inspection-chp?page=${numberPage}`)
const addData = (data) => adminInstance.post('/product-inspection-chp', data)
const updateData = (id, data) => adminInstance.post(`/product-inspection-chp/${id}`, data)
const deleteData = (id) => adminInstance.delete(`/product-inspection-chp/${id}`)

const apiChapterInspection = {
    get,
    addData,
    updateData,
    deleteData
}

export default apiChapterInspection