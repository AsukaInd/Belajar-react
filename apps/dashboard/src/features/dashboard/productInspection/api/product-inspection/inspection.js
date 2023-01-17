import { subscriberInstance } from "~/lib/axios";

const getService = (numberPage) => subscriberInstance.get(`/product-inspection-book?page=${numberPage}`)

const apiInspection = {
    getService
}

export default apiInspection