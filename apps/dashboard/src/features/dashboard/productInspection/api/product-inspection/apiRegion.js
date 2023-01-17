import { subscriberInstance } from "../../../../../lib/axios";

const getCountry = () => subscriberInstance.get(`/country`)
const getProvince = () => subscriberInstance.get(`/province`)
const getCity = () => subscriberInstance.get(`/city`)

const apiRegions = {
    getCountry,
    getProvince,
    getCity
}

export default apiRegions