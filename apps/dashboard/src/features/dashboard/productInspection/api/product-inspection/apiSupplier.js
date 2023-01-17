import { subscriberInstance } from "../../../../../lib/axios";

const type = () => subscriberInstance.get(`/suppliertype`)

const store = (data) => subscriberInstance.post(`/supplier`,data)

const apiSupplier = {
    type,
    store
}

export default apiSupplier